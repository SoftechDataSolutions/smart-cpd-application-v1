package io.github.softech.dev.sgill.web.rest;

import io.github.softech.dev.sgill.Smartcpdv1App;

import io.github.softech.dev.sgill.domain.Section;
import io.github.softech.dev.sgill.domain.Quiz;
import io.github.softech.dev.sgill.domain.Course;
import io.github.softech.dev.sgill.repository.SectionRepository;
import io.github.softech.dev.sgill.repository.search.SectionSearchRepository;
import io.github.softech.dev.sgill.service.SectionService;
import io.github.softech.dev.sgill.web.rest.errors.ExceptionTranslator;
import io.github.softech.dev.sgill.service.dto.SectionCriteria;
import io.github.softech.dev.sgill.service.SectionQueryService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static io.github.softech.dev.sgill.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SectionResource REST controller.
 *
 * @see SectionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartcpdv1App.class)
public class SectionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    private static final String DEFAULT_NORM_SECTION = "AAAAAAAAAA";
    private static final String UPDATED_NORM_SECTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_CONTENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CONTENT = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_CONTENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CONTENT_CONTENT_TYPE = "image/png";

    @Autowired
    private SectionRepository sectionRepository;

    

    @Autowired
    private SectionService sectionService;

    /**
     * This repository is mocked in the io.github.softech.dev.sgill.repository.search test package.
     *
     * @see io.github.softech.dev.sgill.repository.search.SectionSearchRepositoryMockConfiguration
     */
    @Autowired
    private SectionSearchRepository mockSectionSearchRepository;

    @Autowired
    private SectionQueryService sectionQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSectionMockMvc;

    private Section section;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SectionResource sectionResource = new SectionResource(sectionService, sectionQueryService);
        this.restSectionMockMvc = MockMvcBuilders.standaloneSetup(sectionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Section createEntity(EntityManager em) {
        Section section = new Section()
            .name(DEFAULT_NAME)
            .notes(DEFAULT_NOTES)
            .normSection(DEFAULT_NORM_SECTION)
            .content(DEFAULT_CONTENT)
            .contentContentType(DEFAULT_CONTENT_CONTENT_TYPE);
        return section;
    }

    @Before
    public void initTest() {
        section = createEntity(em);
    }

    @Test
    @Transactional
    public void createSection() throws Exception {
        int databaseSizeBeforeCreate = sectionRepository.findAll().size();

        // Create the Section
        restSectionMockMvc.perform(post("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(section)))
            .andExpect(status().isCreated());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeCreate + 1);
        Section testSection = sectionList.get(sectionList.size() - 1);
        assertThat(testSection.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSection.getNotes()).isEqualTo(DEFAULT_NOTES);
        assertThat(testSection.getNormSection()).isEqualTo(DEFAULT_NORM_SECTION);
        assertThat(testSection.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testSection.getContentContentType()).isEqualTo(DEFAULT_CONTENT_CONTENT_TYPE);

        // Validate the Section in Elasticsearch
        verify(mockSectionSearchRepository, times(1)).save(testSection);
    }

    @Test
    @Transactional
    public void createSectionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sectionRepository.findAll().size();

        // Create the Section with an existing ID
        section.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSectionMockMvc.perform(post("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(section)))
            .andExpect(status().isBadRequest());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeCreate);

        // Validate the Section in Elasticsearch
        verify(mockSectionSearchRepository, times(0)).save(section);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = sectionRepository.findAll().size();
        // set the field null
        section.setName(null);

        // Create the Section, which fails.

        restSectionMockMvc.perform(post("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(section)))
            .andExpect(status().isBadRequest());

        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSections() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList
        restSectionMockMvc.perform(get("/api/sections?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(section.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())))
            .andExpect(jsonPath("$.[*].normSection").value(hasItem(DEFAULT_NORM_SECTION.toString())))
            .andExpect(jsonPath("$.[*].contentContentType").value(hasItem(DEFAULT_CONTENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(Base64Utils.encodeToString(DEFAULT_CONTENT))));
    }
    

    @Test
    @Transactional
    public void getSection() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get the section
        restSectionMockMvc.perform(get("/api/sections/{id}", section.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(section.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()))
            .andExpect(jsonPath("$.normSection").value(DEFAULT_NORM_SECTION.toString()))
            .andExpect(jsonPath("$.contentContentType").value(DEFAULT_CONTENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.content").value(Base64Utils.encodeToString(DEFAULT_CONTENT)));
    }

    @Test
    @Transactional
    public void getAllSectionsByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList where name equals to DEFAULT_NAME
        defaultSectionShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the sectionList where name equals to UPDATED_NAME
        defaultSectionShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllSectionsByNameIsInShouldWork() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList where name in DEFAULT_NAME or UPDATED_NAME
        defaultSectionShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the sectionList where name equals to UPDATED_NAME
        defaultSectionShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllSectionsByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList where name is not null
        defaultSectionShouldBeFound("name.specified=true");

        // Get all the sectionList where name is null
        defaultSectionShouldNotBeFound("name.specified=false");
    }

    @Test
    @Transactional
    public void getAllSectionsByNotesIsEqualToSomething() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList where notes equals to DEFAULT_NOTES
        defaultSectionShouldBeFound("notes.equals=" + DEFAULT_NOTES);

        // Get all the sectionList where notes equals to UPDATED_NOTES
        defaultSectionShouldNotBeFound("notes.equals=" + UPDATED_NOTES);
    }

    @Test
    @Transactional
    public void getAllSectionsByNotesIsInShouldWork() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList where notes in DEFAULT_NOTES or UPDATED_NOTES
        defaultSectionShouldBeFound("notes.in=" + DEFAULT_NOTES + "," + UPDATED_NOTES);

        // Get all the sectionList where notes equals to UPDATED_NOTES
        defaultSectionShouldNotBeFound("notes.in=" + UPDATED_NOTES);
    }

    @Test
    @Transactional
    public void getAllSectionsByNotesIsNullOrNotNull() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList where notes is not null
        defaultSectionShouldBeFound("notes.specified=true");

        // Get all the sectionList where notes is null
        defaultSectionShouldNotBeFound("notes.specified=false");
    }

    @Test
    @Transactional
    public void getAllSectionsByNormSectionIsEqualToSomething() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList where normSection equals to DEFAULT_NORM_SECTION
        defaultSectionShouldBeFound("normSection.equals=" + DEFAULT_NORM_SECTION);

        // Get all the sectionList where normSection equals to UPDATED_NORM_SECTION
        defaultSectionShouldNotBeFound("normSection.equals=" + UPDATED_NORM_SECTION);
    }

    @Test
    @Transactional
    public void getAllSectionsByNormSectionIsInShouldWork() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList where normSection in DEFAULT_NORM_SECTION or UPDATED_NORM_SECTION
        defaultSectionShouldBeFound("normSection.in=" + DEFAULT_NORM_SECTION + "," + UPDATED_NORM_SECTION);

        // Get all the sectionList where normSection equals to UPDATED_NORM_SECTION
        defaultSectionShouldNotBeFound("normSection.in=" + UPDATED_NORM_SECTION);
    }

    @Test
    @Transactional
    public void getAllSectionsByNormSectionIsNullOrNotNull() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList where normSection is not null
        defaultSectionShouldBeFound("normSection.specified=true");

        // Get all the sectionList where normSection is null
        defaultSectionShouldNotBeFound("normSection.specified=false");
    }

    @Test
    @Transactional
    public void getAllSectionsByQuizIsEqualToSomething() throws Exception {
        // Initialize the database
        Quiz quiz = QuizResourceIntTest.createEntity(em);
        em.persist(quiz);
        em.flush();
        section.setQuiz(quiz);
        sectionRepository.saveAndFlush(section);
        Long quizId = quiz.getId();

        // Get all the sectionList where quiz equals to quizId
        defaultSectionShouldBeFound("quizId.equals=" + quizId);

        // Get all the sectionList where quiz equals to quizId + 1
        defaultSectionShouldNotBeFound("quizId.equals=" + (quizId + 1));
    }


    @Test
    @Transactional
    public void getAllSectionsByCourseIsEqualToSomething() throws Exception {
        // Initialize the database
        Course course = CourseResourceIntTest.createEntity(em);
        em.persist(course);
        em.flush();
        section.setCourse(course);
        sectionRepository.saveAndFlush(section);
        Long courseId = course.getId();

        // Get all the sectionList where course equals to courseId
        defaultSectionShouldBeFound("courseId.equals=" + courseId);

        // Get all the sectionList where course equals to courseId + 1
        defaultSectionShouldNotBeFound("courseId.equals=" + (courseId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultSectionShouldBeFound(String filter) throws Exception {
        restSectionMockMvc.perform(get("/api/sections?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(section.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())))
            .andExpect(jsonPath("$.[*].normSection").value(hasItem(DEFAULT_NORM_SECTION.toString())))
            .andExpect(jsonPath("$.[*].contentContentType").value(hasItem(DEFAULT_CONTENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(Base64Utils.encodeToString(DEFAULT_CONTENT))));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultSectionShouldNotBeFound(String filter) throws Exception {
        restSectionMockMvc.perform(get("/api/sections?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    @Transactional
    public void getNonExistingSection() throws Exception {
        // Get the section
        restSectionMockMvc.perform(get("/api/sections/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSection() throws Exception {
        // Initialize the database
        sectionService.save(section);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockSectionSearchRepository);

        int databaseSizeBeforeUpdate = sectionRepository.findAll().size();

        // Update the section
        Section updatedSection = sectionRepository.findById(section.getId()).get();
        // Disconnect from session so that the updates on updatedSection are not directly saved in db
        em.detach(updatedSection);
        updatedSection
            .name(UPDATED_NAME)
            .notes(UPDATED_NOTES)
            .normSection(UPDATED_NORM_SECTION)
            .content(UPDATED_CONTENT)
            .contentContentType(UPDATED_CONTENT_CONTENT_TYPE);

        restSectionMockMvc.perform(put("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSection)))
            .andExpect(status().isOk());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeUpdate);
        Section testSection = sectionList.get(sectionList.size() - 1);
        assertThat(testSection.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSection.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testSection.getNormSection()).isEqualTo(UPDATED_NORM_SECTION);
        assertThat(testSection.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testSection.getContentContentType()).isEqualTo(UPDATED_CONTENT_CONTENT_TYPE);

        // Validate the Section in Elasticsearch
        verify(mockSectionSearchRepository, times(1)).save(testSection);
    }

    @Test
    @Transactional
    public void updateNonExistingSection() throws Exception {
        int databaseSizeBeforeUpdate = sectionRepository.findAll().size();

        // Create the Section

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restSectionMockMvc.perform(put("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(section)))
            .andExpect(status().isBadRequest());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Section in Elasticsearch
        verify(mockSectionSearchRepository, times(0)).save(section);
    }

    @Test
    @Transactional
    public void deleteSection() throws Exception {
        // Initialize the database
        sectionService.save(section);

        int databaseSizeBeforeDelete = sectionRepository.findAll().size();

        // Get the section
        restSectionMockMvc.perform(delete("/api/sections/{id}", section.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Section in Elasticsearch
        verify(mockSectionSearchRepository, times(1)).deleteById(section.getId());
    }

    @Test
    @Transactional
    public void searchSection() throws Exception {
        // Initialize the database
        sectionService.save(section);
        when(mockSectionSearchRepository.search(queryStringQuery("id:" + section.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(section), PageRequest.of(0, 1), 1));
        // Search the section
        restSectionMockMvc.perform(get("/api/_search/sections?query=id:" + section.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(section.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())))
            .andExpect(jsonPath("$.[*].normSection").value(hasItem(DEFAULT_NORM_SECTION.toString())))
            .andExpect(jsonPath("$.[*].contentContentType").value(hasItem(DEFAULT_CONTENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(Base64Utils.encodeToString(DEFAULT_CONTENT))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Section.class);
        Section section1 = new Section();
        section1.setId(1L);
        Section section2 = new Section();
        section2.setId(section1.getId());
        assertThat(section1).isEqualTo(section2);
        section2.setId(2L);
        assertThat(section1).isNotEqualTo(section2);
        section1.setId(null);
        assertThat(section1).isNotEqualTo(section2);
    }
}

package io.github.softech.dev.sgill.web.rest;

import io.github.softech.dev.sgill.Smartcpdv1App;

import io.github.softech.dev.sgill.domain.TimeCourseLog;
import io.github.softech.dev.sgill.domain.Customer;
import io.github.softech.dev.sgill.domain.Course;
import io.github.softech.dev.sgill.repository.TimeCourseLogRepository;
import io.github.softech.dev.sgill.repository.search.TimeCourseLogSearchRepository;
import io.github.softech.dev.sgill.service.TimeCourseLogService;
import io.github.softech.dev.sgill.web.rest.errors.ExceptionTranslator;
import io.github.softech.dev.sgill.service.dto.TimeCourseLogCriteria;
import io.github.softech.dev.sgill.service.TimeCourseLogQueryService;

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

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Test class for the TimeCourseLogResource REST controller.
 *
 * @see TimeCourseLogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Smartcpdv1App.class)
public class TimeCourseLogResourceIntTest {

    private static final Instant DEFAULT_LOGGEDIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LOGGEDIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LOGGEDOUT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LOGGEDOUT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_TIMESPENT = 1L;
    private static final Long UPDATED_TIMESPENT = 2L;

    @Autowired
    private TimeCourseLogRepository timeCourseLogRepository;

    

    @Autowired
    private TimeCourseLogService timeCourseLogService;

    /**
     * This repository is mocked in the io.github.softech.dev.sgill.repository.search test package.
     *
     * @see io.github.softech.dev.sgill.repository.search.TimeCourseLogSearchRepositoryMockConfiguration
     */
    @Autowired
    private TimeCourseLogSearchRepository mockTimeCourseLogSearchRepository;

    @Autowired
    private TimeCourseLogQueryService timeCourseLogQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTimeCourseLogMockMvc;

    private TimeCourseLog timeCourseLog;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TimeCourseLogResource timeCourseLogResource = new TimeCourseLogResource(timeCourseLogService, timeCourseLogQueryService);
        this.restTimeCourseLogMockMvc = MockMvcBuilders.standaloneSetup(timeCourseLogResource)
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
    public static TimeCourseLog createEntity(EntityManager em) {
        TimeCourseLog timeCourseLog = new TimeCourseLog()
            .loggedin(DEFAULT_LOGGEDIN)
            .loggedout(DEFAULT_LOGGEDOUT)
            .timespent(DEFAULT_TIMESPENT);
        return timeCourseLog;
    }

    @Before
    public void initTest() {
        timeCourseLog = createEntity(em);
    }

    @Test
    @Transactional
    public void createTimeCourseLog() throws Exception {
        int databaseSizeBeforeCreate = timeCourseLogRepository.findAll().size();

        // Create the TimeCourseLog
        restTimeCourseLogMockMvc.perform(post("/api/time-course-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeCourseLog)))
            .andExpect(status().isCreated());

        // Validate the TimeCourseLog in the database
        List<TimeCourseLog> timeCourseLogList = timeCourseLogRepository.findAll();
        assertThat(timeCourseLogList).hasSize(databaseSizeBeforeCreate + 1);
        TimeCourseLog testTimeCourseLog = timeCourseLogList.get(timeCourseLogList.size() - 1);
        assertThat(testTimeCourseLog.getLoggedin()).isEqualTo(DEFAULT_LOGGEDIN);
        assertThat(testTimeCourseLog.getLoggedout()).isEqualTo(DEFAULT_LOGGEDOUT);
        assertThat(testTimeCourseLog.getTimespent()).isEqualTo(DEFAULT_TIMESPENT);

        // Validate the TimeCourseLog in Elasticsearch
        verify(mockTimeCourseLogSearchRepository, times(1)).save(testTimeCourseLog);
    }

    @Test
    @Transactional
    public void createTimeCourseLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = timeCourseLogRepository.findAll().size();

        // Create the TimeCourseLog with an existing ID
        timeCourseLog.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTimeCourseLogMockMvc.perform(post("/api/time-course-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeCourseLog)))
            .andExpect(status().isBadRequest());

        // Validate the TimeCourseLog in the database
        List<TimeCourseLog> timeCourseLogList = timeCourseLogRepository.findAll();
        assertThat(timeCourseLogList).hasSize(databaseSizeBeforeCreate);

        // Validate the TimeCourseLog in Elasticsearch
        verify(mockTimeCourseLogSearchRepository, times(0)).save(timeCourseLog);
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogs() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList
        restTimeCourseLogMockMvc.perform(get("/api/time-course-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timeCourseLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].loggedin").value(hasItem(DEFAULT_LOGGEDIN.toString())))
            .andExpect(jsonPath("$.[*].loggedout").value(hasItem(DEFAULT_LOGGEDOUT.toString())))
            .andExpect(jsonPath("$.[*].timespent").value(hasItem(DEFAULT_TIMESPENT.intValue())));
    }
    

    @Test
    @Transactional
    public void getTimeCourseLog() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get the timeCourseLog
        restTimeCourseLogMockMvc.perform(get("/api/time-course-logs/{id}", timeCourseLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(timeCourseLog.getId().intValue()))
            .andExpect(jsonPath("$.loggedin").value(DEFAULT_LOGGEDIN.toString()))
            .andExpect(jsonPath("$.loggedout").value(DEFAULT_LOGGEDOUT.toString()))
            .andExpect(jsonPath("$.timespent").value(DEFAULT_TIMESPENT.intValue()));
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogsByLoggedinIsEqualToSomething() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList where loggedin equals to DEFAULT_LOGGEDIN
        defaultTimeCourseLogShouldBeFound("loggedin.equals=" + DEFAULT_LOGGEDIN);

        // Get all the timeCourseLogList where loggedin equals to UPDATED_LOGGEDIN
        defaultTimeCourseLogShouldNotBeFound("loggedin.equals=" + UPDATED_LOGGEDIN);
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogsByLoggedinIsInShouldWork() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList where loggedin in DEFAULT_LOGGEDIN or UPDATED_LOGGEDIN
        defaultTimeCourseLogShouldBeFound("loggedin.in=" + DEFAULT_LOGGEDIN + "," + UPDATED_LOGGEDIN);

        // Get all the timeCourseLogList where loggedin equals to UPDATED_LOGGEDIN
        defaultTimeCourseLogShouldNotBeFound("loggedin.in=" + UPDATED_LOGGEDIN);
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogsByLoggedinIsNullOrNotNull() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList where loggedin is not null
        defaultTimeCourseLogShouldBeFound("loggedin.specified=true");

        // Get all the timeCourseLogList where loggedin is null
        defaultTimeCourseLogShouldNotBeFound("loggedin.specified=false");
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogsByLoggedoutIsEqualToSomething() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList where loggedout equals to DEFAULT_LOGGEDOUT
        defaultTimeCourseLogShouldBeFound("loggedout.equals=" + DEFAULT_LOGGEDOUT);

        // Get all the timeCourseLogList where loggedout equals to UPDATED_LOGGEDOUT
        defaultTimeCourseLogShouldNotBeFound("loggedout.equals=" + UPDATED_LOGGEDOUT);
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogsByLoggedoutIsInShouldWork() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList where loggedout in DEFAULT_LOGGEDOUT or UPDATED_LOGGEDOUT
        defaultTimeCourseLogShouldBeFound("loggedout.in=" + DEFAULT_LOGGEDOUT + "," + UPDATED_LOGGEDOUT);

        // Get all the timeCourseLogList where loggedout equals to UPDATED_LOGGEDOUT
        defaultTimeCourseLogShouldNotBeFound("loggedout.in=" + UPDATED_LOGGEDOUT);
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogsByLoggedoutIsNullOrNotNull() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList where loggedout is not null
        defaultTimeCourseLogShouldBeFound("loggedout.specified=true");

        // Get all the timeCourseLogList where loggedout is null
        defaultTimeCourseLogShouldNotBeFound("loggedout.specified=false");
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogsByTimespentIsEqualToSomething() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList where timespent equals to DEFAULT_TIMESPENT
        defaultTimeCourseLogShouldBeFound("timespent.equals=" + DEFAULT_TIMESPENT);

        // Get all the timeCourseLogList where timespent equals to UPDATED_TIMESPENT
        defaultTimeCourseLogShouldNotBeFound("timespent.equals=" + UPDATED_TIMESPENT);
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogsByTimespentIsInShouldWork() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList where timespent in DEFAULT_TIMESPENT or UPDATED_TIMESPENT
        defaultTimeCourseLogShouldBeFound("timespent.in=" + DEFAULT_TIMESPENT + "," + UPDATED_TIMESPENT);

        // Get all the timeCourseLogList where timespent equals to UPDATED_TIMESPENT
        defaultTimeCourseLogShouldNotBeFound("timespent.in=" + UPDATED_TIMESPENT);
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogsByTimespentIsNullOrNotNull() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList where timespent is not null
        defaultTimeCourseLogShouldBeFound("timespent.specified=true");

        // Get all the timeCourseLogList where timespent is null
        defaultTimeCourseLogShouldNotBeFound("timespent.specified=false");
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogsByTimespentIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList where timespent greater than or equals to DEFAULT_TIMESPENT
        defaultTimeCourseLogShouldBeFound("timespent.greaterOrEqualThan=" + DEFAULT_TIMESPENT);

        // Get all the timeCourseLogList where timespent greater than or equals to UPDATED_TIMESPENT
        defaultTimeCourseLogShouldNotBeFound("timespent.greaterOrEqualThan=" + UPDATED_TIMESPENT);
    }

    @Test
    @Transactional
    public void getAllTimeCourseLogsByTimespentIsLessThanSomething() throws Exception {
        // Initialize the database
        timeCourseLogRepository.saveAndFlush(timeCourseLog);

        // Get all the timeCourseLogList where timespent less than or equals to DEFAULT_TIMESPENT
        defaultTimeCourseLogShouldNotBeFound("timespent.lessThan=" + DEFAULT_TIMESPENT);

        // Get all the timeCourseLogList where timespent less than or equals to UPDATED_TIMESPENT
        defaultTimeCourseLogShouldBeFound("timespent.lessThan=" + UPDATED_TIMESPENT);
    }


    @Test
    @Transactional
    public void getAllTimeCourseLogsByCustomerIsEqualToSomething() throws Exception {
        // Initialize the database
        Customer customer = CustomerResourceIntTest.createEntity(em);
        em.persist(customer);
        em.flush();
        timeCourseLog.setCustomer(customer);
        timeCourseLogRepository.saveAndFlush(timeCourseLog);
        Long customerId = customer.getId();

        // Get all the timeCourseLogList where customer equals to customerId
        defaultTimeCourseLogShouldBeFound("customerId.equals=" + customerId);

        // Get all the timeCourseLogList where customer equals to customerId + 1
        defaultTimeCourseLogShouldNotBeFound("customerId.equals=" + (customerId + 1));
    }


    @Test
    @Transactional
    public void getAllTimeCourseLogsByCourseIsEqualToSomething() throws Exception {
        // Initialize the database
        Course course = CourseResourceIntTest.createEntity(em);
        em.persist(course);
        em.flush();
        timeCourseLog.setCourse(course);
        timeCourseLogRepository.saveAndFlush(timeCourseLog);
        Long courseId = course.getId();

        // Get all the timeCourseLogList where course equals to courseId
        defaultTimeCourseLogShouldBeFound("courseId.equals=" + courseId);

        // Get all the timeCourseLogList where course equals to courseId + 1
        defaultTimeCourseLogShouldNotBeFound("courseId.equals=" + (courseId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultTimeCourseLogShouldBeFound(String filter) throws Exception {
        restTimeCourseLogMockMvc.perform(get("/api/time-course-logs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timeCourseLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].loggedin").value(hasItem(DEFAULT_LOGGEDIN.toString())))
            .andExpect(jsonPath("$.[*].loggedout").value(hasItem(DEFAULT_LOGGEDOUT.toString())))
            .andExpect(jsonPath("$.[*].timespent").value(hasItem(DEFAULT_TIMESPENT.intValue())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultTimeCourseLogShouldNotBeFound(String filter) throws Exception {
        restTimeCourseLogMockMvc.perform(get("/api/time-course-logs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    @Transactional
    public void getNonExistingTimeCourseLog() throws Exception {
        // Get the timeCourseLog
        restTimeCourseLogMockMvc.perform(get("/api/time-course-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTimeCourseLog() throws Exception {
        // Initialize the database
        timeCourseLogService.save(timeCourseLog);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockTimeCourseLogSearchRepository);

        int databaseSizeBeforeUpdate = timeCourseLogRepository.findAll().size();

        // Update the timeCourseLog
        TimeCourseLog updatedTimeCourseLog = timeCourseLogRepository.findById(timeCourseLog.getId()).get();
        // Disconnect from session so that the updates on updatedTimeCourseLog are not directly saved in db
        em.detach(updatedTimeCourseLog);
        updatedTimeCourseLog
            .loggedin(UPDATED_LOGGEDIN)
            .loggedout(UPDATED_LOGGEDOUT)
            .timespent(UPDATED_TIMESPENT);

        restTimeCourseLogMockMvc.perform(put("/api/time-course-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTimeCourseLog)))
            .andExpect(status().isOk());

        // Validate the TimeCourseLog in the database
        List<TimeCourseLog> timeCourseLogList = timeCourseLogRepository.findAll();
        assertThat(timeCourseLogList).hasSize(databaseSizeBeforeUpdate);
        TimeCourseLog testTimeCourseLog = timeCourseLogList.get(timeCourseLogList.size() - 1);
        assertThat(testTimeCourseLog.getLoggedin()).isEqualTo(UPDATED_LOGGEDIN);
        assertThat(testTimeCourseLog.getLoggedout()).isEqualTo(UPDATED_LOGGEDOUT);
        assertThat(testTimeCourseLog.getTimespent()).isEqualTo(UPDATED_TIMESPENT);

        // Validate the TimeCourseLog in Elasticsearch
        verify(mockTimeCourseLogSearchRepository, times(1)).save(testTimeCourseLog);
    }

    @Test
    @Transactional
    public void updateNonExistingTimeCourseLog() throws Exception {
        int databaseSizeBeforeUpdate = timeCourseLogRepository.findAll().size();

        // Create the TimeCourseLog

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restTimeCourseLogMockMvc.perform(put("/api/time-course-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeCourseLog)))
            .andExpect(status().isBadRequest());

        // Validate the TimeCourseLog in the database
        List<TimeCourseLog> timeCourseLogList = timeCourseLogRepository.findAll();
        assertThat(timeCourseLogList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TimeCourseLog in Elasticsearch
        verify(mockTimeCourseLogSearchRepository, times(0)).save(timeCourseLog);
    }

    @Test
    @Transactional
    public void deleteTimeCourseLog() throws Exception {
        // Initialize the database
        timeCourseLogService.save(timeCourseLog);

        int databaseSizeBeforeDelete = timeCourseLogRepository.findAll().size();

        // Get the timeCourseLog
        restTimeCourseLogMockMvc.perform(delete("/api/time-course-logs/{id}", timeCourseLog.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TimeCourseLog> timeCourseLogList = timeCourseLogRepository.findAll();
        assertThat(timeCourseLogList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TimeCourseLog in Elasticsearch
        verify(mockTimeCourseLogSearchRepository, times(1)).deleteById(timeCourseLog.getId());
    }

    @Test
    @Transactional
    public void searchTimeCourseLog() throws Exception {
        // Initialize the database
        timeCourseLogService.save(timeCourseLog);
        when(mockTimeCourseLogSearchRepository.search(queryStringQuery("id:" + timeCourseLog.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(timeCourseLog), PageRequest.of(0, 1), 1));
        // Search the timeCourseLog
        restTimeCourseLogMockMvc.perform(get("/api/_search/time-course-logs?query=id:" + timeCourseLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timeCourseLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].loggedin").value(hasItem(DEFAULT_LOGGEDIN.toString())))
            .andExpect(jsonPath("$.[*].loggedout").value(hasItem(DEFAULT_LOGGEDOUT.toString())))
            .andExpect(jsonPath("$.[*].timespent").value(hasItem(DEFAULT_TIMESPENT.intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimeCourseLog.class);
        TimeCourseLog timeCourseLog1 = new TimeCourseLog();
        timeCourseLog1.setId(1L);
        TimeCourseLog timeCourseLog2 = new TimeCourseLog();
        timeCourseLog2.setId(timeCourseLog1.getId());
        assertThat(timeCourseLog1).isEqualTo(timeCourseLog2);
        timeCourseLog2.setId(2L);
        assertThat(timeCourseLog1).isNotEqualTo(timeCourseLog2);
        timeCourseLog1.setId(null);
        assertThat(timeCourseLog1).isNotEqualTo(timeCourseLog2);
    }
}

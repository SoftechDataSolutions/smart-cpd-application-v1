import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/customer">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.customer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/company">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.company" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/topic">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.topic" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/course">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.course" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/course-cart-bridge">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.courseCartBridge" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/section">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.section" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/quiz">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.quiz" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/question">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.question" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/choice">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.choice" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/course-history">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.courseHistory" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/question-history">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.questionHistory" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/section-history">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.sectionHistory" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/quiz-history">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.quizHistory" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/orders">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.orders" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/cart">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.cart" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/time-course-log">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.timeCourseLog" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);

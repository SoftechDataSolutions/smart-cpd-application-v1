import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import company, {
  CompanyState
} from 'app/entities/company/company.reducer';
// prettier-ignore
import topic, {
  TopicState
} from 'app/entities/topic/topic.reducer';
// prettier-ignore
import course, {
  CourseState
} from 'app/entities/course/course.reducer';
// prettier-ignore
import courseCartBridge, {
  CourseCartBridgeState
} from 'app/entities/course-cart-bridge/course-cart-bridge.reducer';
// prettier-ignore
import section, {
  SectionState
} from 'app/entities/section/section.reducer';
// prettier-ignore
import quiz, {
  QuizState
} from 'app/entities/quiz/quiz.reducer';
// prettier-ignore
import question, {
  QuestionState
} from 'app/entities/question/question.reducer';
// prettier-ignore
import choice, {
  ChoiceState
} from 'app/entities/choice/choice.reducer';
// prettier-ignore
import courseHistory, {
  CourseHistoryState
} from 'app/entities/course-history/course-history.reducer';
// prettier-ignore
import questionHistory, {
  QuestionHistoryState
} from 'app/entities/question-history/question-history.reducer';
// prettier-ignore
import sectionHistory, {
  SectionHistoryState
} from 'app/entities/section-history/section-history.reducer';
// prettier-ignore
import quizHistory, {
  QuizHistoryState
} from 'app/entities/quiz-history/quiz-history.reducer';
// prettier-ignore
import orders, {
  OrdersState
} from 'app/entities/orders/orders.reducer';
// prettier-ignore
import cart, {
  CartState
} from 'app/entities/cart/cart.reducer';
// prettier-ignore
import timeCourseLog, {
  TimeCourseLogState
} from 'app/entities/time-course-log/time-course-log.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly customer: CustomerState;
  readonly company: CompanyState;
  readonly topic: TopicState;
  readonly course: CourseState;
  readonly courseCartBridge: CourseCartBridgeState;
  readonly section: SectionState;
  readonly quiz: QuizState;
  readonly question: QuestionState;
  readonly choice: ChoiceState;
  readonly courseHistory: CourseHistoryState;
  readonly questionHistory: QuestionHistoryState;
  readonly sectionHistory: SectionHistoryState;
  readonly quizHistory: QuizHistoryState;
  readonly orders: OrdersState;
  readonly cart: CartState;
  readonly timeCourseLog: TimeCourseLogState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  customer,
  company,
  topic,
  course,
  courseCartBridge,
  section,
  quiz,
  question,
  choice,
  courseHistory,
  questionHistory,
  sectionHistory,
  quizHistory,
  orders,
  cart,
  timeCourseLog,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;

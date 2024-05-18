import { Routes } from '@angular/router';
import { HomeComponent } from './front-side/home/home.component';
import { LoginUserComponent } from './join/login-user/login-user.component';
import { LoginComponent } from './join/login/login.component';
import { LecturerComponent } from './dashboard/lecturer/lecturer.component';
import { DashBoardComponent } from './dashboard/dash-board/dash-board.component';
import { ContactComponent } from './dashboard/lecturer/contact/contact.component';
import { VedioComponent } from './dashboard/lecturer/vedio/vedio.component';
import { LectureComponent } from './dashboard/lecturer/lecture/lecture.component';
import { CoursesComponent } from './dashboard/lecturer/courses/courses.component';
import { ShowVedioComponent } from './dashboard/lecturer/show-vedio/show-vedio.component';
import { EditVedioComponent } from './dashboard/lecturer/edit-vedio/edit-vedio.component';
import { AddLectureComponent } from './dashboard/lecturer/add-lecture/add-lecture.component';
import { AddCourseComponent } from './dashboard/lecturer/add-course/add-course.component';
import { EditCourseComponent } from './dashboard/lecturer/edit-course/edit-course.component';
import { CourseContentComponent } from './dashboard/lecturer/course-content/course-content.component';
import { AddContentComponent } from './dashboard/lecturer/add-content/add-content.component';
import { EditLectureComponent } from './dashboard/lecturer/edit-lecture/edit-lecture.component';
import { AuthGuard } from './guard/auth.guard';
import { lecturerGuard } from './guard/lecturer.guard';
import { NotAllowComponent } from './NotFound/not-allow/not-allow.component';
import { logginGuard } from './guard/login.guard';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AdminLecturerComponent } from './dashboard/admin/admin-lecturer/admin-lecturer.component';
import { AdminHomeComponent } from './dashboard/admin/home/home.component';
import { AdminStudentComponent } from './dashboard/admin/admin-student/admin-student.component';
import { SettingComponent } from './dashboard/admin/setting/setting.component';
import { AdminParentComponent } from './dashboard/admin/admin-parent/admin-parent.component';
import { AdminEditLecturerComponent } from './dashboard/admin/admin-lecturer/admin-edit-lecturer/admin-edit-lecturer.component';
import { EditAdminStudentComponent } from './dashboard/admin/admin-student/edit-admin-student/edit-admin-student.component';
import { EditAdminComponent } from './dashboard/admin/setting/edit-admin/edit-admin.component';
import { showadminComponent } from './dashboard/admin/admin/admin.component';
import { AddAdminComponent } from './dashboard/admin/admin/add-admin/add-admin.component';
import { AdminVedioComponent } from './dashboard/admin/admin-vedio/admin-vedio.component';
import { AdminLectureComponent } from './dashboard/admin/admin-lecture/admin-lecture.component';
import { AdminCoursesComponent } from './dashboard/admin/admin-courses/admin-courses.component';
import { AdminCourseContentComponent } from './dashboard/admin/admin-courses/admin-course-content/admin-course-content.component';
import { adminGuard } from './guard/admin.guard';
import { CourseDetailsHomeComponent } from './front-side/course-home/course-details-home/course-details-home.component';
import { ShowAppComponent } from './show-app/show-app.component';
import { StudentComponent } from './front-side/student/student.component';
import { CartComponent } from './front-side/cart/cart.component';

export const routes: Routes = [
  {
    path: 'site',
    component: ShowAppComponent,
    title: 'home',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'home',
      },
      {
        path: 'course-details/:id',
        component: CourseDetailsHomeComponent,
        title: 'course Details',
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'My cart',
      },
      {
        path: 'studentProfile',
        component: StudentComponent,
        title: 'profile',
      },
    ],
  },



  {
    path: '',
    redirectTo: 'site/home',
    pathMatch: 'full',
  },

  // route for control Panel
  {
    path: 'dash',
    component: DashBoardComponent,
    title: 'Control Home',
    children: [
      { path: '', redirectTo: 'dash', pathMatch: 'full', title: 'control' },

      // lecturer Profile Details
      {
        path: 'lecturer',
        component: LecturerComponent,
        title: 'lecturer',
        canActivate: [AuthGuard, lecturerGuard],
        children: [
          { path: 'contact', component: ContactComponent, title: 'contact' },
          { path: 'vedio', component: ShowVedioComponent, title: 'vedio' },
          { path: 'add-vedio', component: VedioComponent, title: 'add vedio' },
          {
            path: 'editVedio/:id',
            component: EditVedioComponent,
            title: 'edit vedio',
          },
          { path: 'lecture', component: LectureComponent, title: 'lecture' },
          {
            path: 'add-lecture',
            component: AddLectureComponent,
            title: 'lecture',
          },
          { path: 'courses', component: CoursesComponent, title: 'courses' },
          {
            path: 'add-course',
            component: AddCourseComponent,
            title: 'courses',
          },
          {
            path: 'edit-course/:id',
            component: EditCourseComponent,
            title: 'courses',
          },
          {
            path: 'edit-lecture/:id',
            component: EditLectureComponent,
            title: 'courses',
          },
          {
            path: 'course-content/:id',
            component: CourseContentComponent,
            title: 'courses',
          },
          {
            path: 'add-content/:id',
            component: AddContentComponent,
            title: 'courses',
          },
        ],
      },
      // End lecturer Profile Details
    ],
  },
  // End route for control Panel

  // Start Admin Route
  {
    path: 'admin',
    component: AdminComponent,
    title: 'control',
    canActivate: [AuthGuard, adminGuard],
    children: [
      { path: 'home', component: AdminHomeComponent, title: 'lecturer' },
      {
        path: 'lecturer',
        component: AdminLecturerComponent,
        title: 'lecturer',
      },
      { path: 'admin', component: showadminComponent, title: 'Admin' },
      { path: 'addAdmin', component: AddAdminComponent, title: 'Admin' },
      {
        path: 'Editlecturer/:id',
        component: AdminEditLecturerComponent,
        title: 'lecturer',
      },
      {
        path: 'Editstudent/:id',
        component: EditAdminStudentComponent,
        title: 'student',
      },
      {
        path: 'editAdmin/:id',
        component: EditAdminComponent,
        title: 'setting',
      },
      { path: 'student', component: AdminStudentComponent, title: 'lecturer' },
      { path: 'setting', component: SettingComponent, title: 'lecturer' },
      { path: 'vedio', component: AdminVedioComponent, title: 'videos' },
      { path: 'lecture', component: AdminLectureComponent, title: 'lecture' },
      { path: 'course', component: AdminCoursesComponent, title: 'course' },
      {
        path: 'course-content/:id',
        component: AdminCourseContentComponent,
        title: 'courses',
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  // End Admin Route

  {
    path: 'login',
    component: LoginComponent,
    title: 'تسجيل الدخول',
    canActivate: [logginGuard],
  },
  {
    path: 'register',
    component: LoginUserComponent,
    title: 'تسجيل الدخول',
    canActivate: [logginGuard],
  },

  { path: '**', component: NotAllowComponent, title: 'notAllow' },
];

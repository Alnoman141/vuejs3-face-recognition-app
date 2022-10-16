import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from './modules/user';

const HomeComponent = () => import('@/views/index.vue');
const SignupComponent = () => import('@/views/sign-up.vue');
const ImageRegistration = () => import("@/views/image-registration.vue");
const CaptureImage = () => import("@/views/capture-image.vue");
const CompleteRegistration = () => import("@/views/registration-complete.vue");
const Attendence = () => import("@/views/attendence.vue");


const routes = [
  {
    path: "/",
    name: "index",
    component: HomeComponent,
  },
  {
    path: "/sign-up",
    name: "signUp",
    component: SignupComponent,
  },
  {
    path: "/image-registration-instruction",
    name: "imageRegistration",
    component: ImageRegistration,
  },
  {
    path: "/capture-image",
    name: "captureImage",
    component: CaptureImage,
  },
  {
    path: "/register-complete",
    name: "completeRegister",
    component: CompleteRegistration,
  },
  {
    path: "/attendence",
    name: "attendence",
    component: Attendence,
  },
  userRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
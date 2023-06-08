import MyProfileIcon from '@/assets/icons/header/Profile/MyProfileIcon.vue'
import MyActivityIcon from '@/assets/icons/header/Profile/MyActivityIcon.vue'

const profile: ProfileItem[] = [
  {
    title: "Mi Perfil",
    icon: MyProfileIcon,
  },
  {
    title: "Mi actividad",
    icon: MyActivityIcon,
  },
];

export { profile };

interface ProfileItem {
  title: string;
  icon: any
}
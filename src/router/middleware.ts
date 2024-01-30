import { getUserAuth } from "@/helper";
import type { RouteLocationNormalized, NavigationGuardNext, } from "vue-router";
import type { UserAuth } from '@/interfaces/User/User.auth';
import { UserStore } from "@/stores/UserStore";
import { COMMONS_PERMISSIONS, type PERMISSION_ENUM } from "@/enums/Permissions.enum";


export function checkedRole(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const rolesPermited: string[] = to.meta.roles as string[];
    const roleUser = getUserAuth().roles[0]

    if (rolesPermited.includes(roleUser.name)) {
        next();
    }
    next({ name: 'Unauthorized' });
}

export function checkedPermission(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const permissionsPermited: PERMISSION_ENUM[] = to.meta.permissions as PERMISSION_ENUM[];
    if (permissionsPermited.length === 0) next()
    const reference: PERMISSION_ENUM | undefined = to.meta.reference as PERMISSION_ENUM ?? undefined;
    // const permissionsUser = getUserAuth().roles[0].permissions.map(permissionUser => permissionUser.name)
    const userStore = UserStore()
    const userCan: boolean = permissionsPermited.map(
        p => {
            if (reference) {
                return userStore.can(p, reference)
            }
            return userStore.can(COMMONS_PERMISSIONS.GET, p)
        }
    ).every(p => p === true)

    if (
        // permissionsPermited.some(permissionPermited => permissionsUser.includes(permissionPermited))
        userCan
    ) {
        next();
    }
    next({ name: 'Unauthorized' });
}

export function checkedRoleOrPermission(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const rolesPermited: string[] = to.meta.roles as string[];
    const roleUser = getUserAuth().roles[0]
    const isRolePermitted = rolesPermited.includes(roleUser.name)

    const permissionsPermited: PERMISSION_ENUM[] = to.meta.permissions as PERMISSION_ENUM[];
    // const permissionsUser = getUserAuth().roles[0].permissions.map(permissionUser => permissionUser.name)
    const userStore = UserStore()
    const userCan: boolean = !!permissionsPermited.find(p => userStore.can('index', p))

    // const permissionsPermited: string[] = to.meta.permissions as string[];
    // const permissionsUser = getUserAuth().roles[0].permissions.map(permissionUser => permissionUser.name)
    // const isPemissionPermitted = permissionsPermited.some(permissionPermited => permissionsUser.includes(permissionPermited))

    if (isRolePermitted || userCan) {
        next()
    }
    next({ name: 'Unauthorized' });

}

export function checkedVerificationsUser(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
) {
    const user = getUserAuth()

    const verificateds: string[] = to.meta.verificateds as string[];
    if (verificateds.length === 0) next()
    console.log('verificateds', verificateds)
    console.log('user', user)
    const allVerificateds = verificateds
        .map((v) => user[v as keyof UserAuth])
        .every((v) => v)
    console.log('allVerificateds', allVerificateds)

    if (allVerificateds) {
        next()
    }
    next({ name: 'user-profile' });
}
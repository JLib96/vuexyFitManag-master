<template>
  <b-card>

    <b-row>

      <!-- item Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <!-- <b-avatar
            :src="userData.avatar"
            :text="avatarText(userData.fullName)"
            :variant="`light-${resolveUserRoleVariant(userData.role)}`"
            size="104px"
            rounded
          /> -->
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ itemData.societyName }}
              </h4>
              <span class="card-text">{{ itemData.pec }}</span>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                :to="{ name: 'app-fit-anag-societies-edit', params: { id: itemData.id } }"
                variant="primary"
              >
                Modifica
              </b-button>
              <b-button
                variant="outline-danger"
                class="ml-1"
              >
                Delete
              </b-button>
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center mt-2">
          <div class="d-flex align-items-center mr-2">
            <b-avatar
              variant="light-primary"
              rounded
            >
              <feather-icon
                icon="CreditCardIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                {{ itemData.iBAN }}
              </h5>
              <small>IBAN</small>
            </div>
          </div>

        </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="6"
      >
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="CheckSquareIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Nome Società</span>
            </th>
            <td class="pb-50">
              {{ itemData.societyName }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Status</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ itemData.state }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="HomeIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Indirizzo</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ itemData.addressLegal }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="GlobeIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">CAP</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ itemData.capLegal }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="GlobeIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Località</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ itemData.localityLegal }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="GlobeIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Provincia</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ itemData.provinceLegal }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="PhoneIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Telefono</span>
            </th>
            <td>
              {{ itemData.telephoneLegal1 }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="StarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Cod. Fiscale</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ itemData.fiscalCode }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="MailIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Pec</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ itemData.pec }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="FlagIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Paese</span>
            </th>
            <td class="pb-50">
              Italia
            </td>
          </tr>
          <!-- <tr>
            <th class="pb-50">
              <feather-icon
                icon="StarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Role</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ itemData.role }}
            </td>
          </tr> -->
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BRow, BCol, BAvatar,
} from 'bootstrap-vue'
// import { avatarText } from '@core/utils/filter'
// import useUsersList from '../users-list/useUsersList'

export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,
  },
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  // setup() {
  //   // const { resolveUserRoleVariant } = useUsersList()
  //   return {
  //     // avatarText,
  //     // resolveUserRoleVariant,
  //   }
  // },
}
</script>

<style>

</style>

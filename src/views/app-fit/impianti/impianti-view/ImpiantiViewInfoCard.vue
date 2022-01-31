<template>
  <div>
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
                  {{ itemData.denominazione }}
                </h4>
                <span class="card-text">{{ itemData.email }}</span>
              </div>
              <div class="d-flex flex-wrap">
                <b-button
                  :to="{ name: 'app-fit-anag-impianti-edit', params: { id: itemData.id } }"
                  variant="primary"
                >
                  Modifica
                </b-button>
              <!-- <b-button
                variant="outline-danger"
                class="ml-1"
              >
                Delete
              </b-button> -->
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
                  {{ itemData.cod_impianto }}
                </h5>
                <small>Codice</small>
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
                <span class="font-weight-bold">Tipologia</span>
              </th>
              <td class="pb-50">
                da settare
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon
                  icon="CheckSquareIcon"
                  class="mr-75"
                />
                <span class="font-weight-bold">Proprietà</span>
              </th>
              <td class="pb-50">
                da settare
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon
                  icon="HomeIcon"
                  class="mr-75"
                />
                <span class="font-weight-bold">Provincia</span>
              </th>
              <td class="pb-50 text-capitalize">
                {{ itemData.provincia }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon
                  icon="GlobeIcon"
                  class="mr-75"
                />
                <span class="font-weight-bold">Comune</span>
              </th>
              <td class="pb-50 text-capitalize">
                {{ itemData.comune }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon
                  icon="GlobeIcon"
                  class="mr-75"
                />
                <span class="font-weight-bold">Indirizzo</span>
              </th>
              <td class="pb-50 text-capitalize">
                {{ itemData.indirizzo }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon
                  icon="GlobeIcon"
                  class="mr-75"
                />
                <span class="font-weight-bold">Numero civico</span>
              </th>
              <td class="pb-50 text-capitalize">
                {{ itemData.num_civico }}
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
                {{ itemData.cap }}
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
                {{ itemData.telefono }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon
                  icon="MailIcon"
                  class="mr-75"
                />
                <span class="font-weight-bold">Mail</span>
              </th>
              <td class="pb-50 text-capitalize">
                {{ itemData.email }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon
                  icon="GlobeIcon"
                  class="mr-75"
                />
                <span class="font-weight-bold">Fax</span>
              </th>
              <td class="pb-50 text-capitalize">
                {{ itemData.fax }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon
                  icon="GlobeIcon"
                  class="mr-75"
                />
                <span class="font-weight-bold">SitoWeb</span>
              </th>
              <td class="pb-50 text-capitalize">
                {{ itemData.web }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon
                  icon="FlagIcon"
                  class="mr-75"
                />
                <span class="font-weight-bold">Latitudine</span>
              </th>
              <td class="pb-50">
                {{ itemData.lat }}
              </td>
            </tr>
            <tr>
              <th class="pb-50">
                <feather-icon
                  icon="StarIcon"
                  class="mr-75"
                />
                <span class="font-weight-bold">Longitudine</span>
              </th>
              <td class="pb-50 text-capitalize">
                {{ itemData.lon }}
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
    <b-card>

      <b-row
        :key="campo.id"
        :v-for="campo in itemData.campi"
      >

        <!-- item Info: Left col -->
        <b-col
          cols="21"
          xl="6"
          class="d-flex justify-content-between flex-column"
        />
      </b-row>
      <tr>
        <th class="pb-50">
          <feather-icon
            icon="CheckSquareIcon"
            class="mr-75"
          />
          <span class="font-weight-bold">Disciplina</span>
        </th>
        <td class="pb-50">
          {{ campo.disciplina }}
        </td>
        <th class="pb-50">
          <feather-icon
            icon="CheckSquareIcon"
            class="mr-75"
          />
          <span class="font-weight-bold">Nome Campo</span>
        </th>
        <td class="pb-50">
          {{ campo.nome_campo }}
        </td>
      </tr>
    </b-card>
  </div>
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

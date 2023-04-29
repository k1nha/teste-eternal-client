<template>
  <div class="bg-cover w-screen h-screen flex p-2 bg-gray-900">
    <Header></Header>
    <div
      class="w-[calc(100%-240px)] bg-white/50 backdrop-blur-sm duration-150 rounded-2xl py-5 relative h-[calc(100vh-20px)] ml-3 flex flex-col items-center text-white"
    >
      <div class="w-full flex p-10">
        <div class="w-full flex justify-between items-center rounded-md">
          <span class="text-xl uppercase tracking-wide font-bold">Classes</span>
          <q-btn label="Register" color="primary" @click="register = true" />
        </div>
      </div>

      <div class="w-full p-10">
        <q-table
          title="List of Classes"
          :columns="columns"
          :rows="classes"
          separator="cell"
          row-key="_id"
          dense
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                icon="create"
                color="warning"
                size="sm"
                dense
                @click="editStudent(props.row._id)"
              />
              <q-btn
                icon="delete"
                color="negative"
                size="sm"
                dense
                class="ml-2"
                @click="deleteStudent(props.row._id)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>

  <!-- Modal Form -->
  <q-dialog v-model="register">
    <q-card>
      <q-form
        class="flex flex-col justify-between h-[500px] w-[500px] bg-white p-10"
        @submit="onSubmit"
      >
        <q-input outlined v-model="nameClasses" label="Name" />
        <q-select
          class="w-auto"
          outlined
          v-model="modelCourses"
          :options="coursesSelectedOptions"
          label="Courses"
        />

        <q-input
          filled
          v-model="startDate"
          mask="date"
          :rules="['date']"
          label="Starting date"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="startDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="endDate"
          mask="date"
          :rules="['date']"
          label="End Date"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="endDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-btn label="Register" color="primary" type="submit" v-close-popup />
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '../../services/axios';
import Header from '../../components/header/Header.vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'Classes',
  components: {
    Header,
  },
  data() {
    return {
      classes: [],
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      register: ref(false),
      nameClasses: ref(''),
      modelCourses: ref(''),
      startDate: ref(''),
      endDate: ref(''),
      coursesOptions: ref([]),
      coursesSelectedOptions: ref([]),
      columns: [
        {
          name: '',
        },
      ],
    };
  },

  methods: {
    onSubmit() {
      console.log('ok');
      console.log('ok');
      console.log('ok');
    },
    async populateTable() {},
    async populateOptionsCourses() {
      await axios
        .get('/api/courses')
        .then(res => (this.coursesOptions = res.data))
        .catch(err => {
          this.$q.notify({
            message: `Error, check your console! ${err.message}`,
            position: 'top-right',
            icon: 'announcement',
            color: 'warning',
          });
        });

      this.coursesOptions.map(item =>
        this.coursesSelectedOptions.push(item.name),
      );
    },
  },

  mounted() {
    this.populateTable();
    this.populateOptionsCourses();
  },
});
</script>

<!-- TODO: POPULATE TABLE REFRESH INPUTS -->
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
                @click="editClasses(props.row._id)"
              />
              <q-btn
                icon="delete"
                color="negative"
                size="sm"
                dense
                class="ml-2"
                @click="deleteClasses(props.row._id)"
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
        <span class="text-xl">Register</span>
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

  <!-- MODAL EDIT -->
  <q-dialog v-model="edit">
    <q-card>
      <q-form
        class="flex flex-col justify-between h-[500px] w-[500px] bg-white p-10"
        @submit="onEditSubmit"
      >
        <span class="text-xl">Edit</span>
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

        <q-btn label="Edit" color="primary" type="submit" v-close-popup />
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '../../services/axios';
import Header from '../../components/header/Header.vue';
import { useQuasar } from 'quasar';

interface ICourses {
  _id: string;
  name: string;
  description: string;
}

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
      edit: ref(false),
      nameClasses: ref(''),
      modelCourses: ref(''),
      startDate: ref(''),
      endDate: ref(''),
      coursesOptions: ref([]),
      coursesSelectedOptions: ref([]),
      editId: ref(''),
      columns: [
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'center',
          sortable: true,
        },
        {
          name: 'courses',
          label: 'Courses',
          field: row => row.id_course.name,
          align: 'center',
          sortable: true,
        },
        {
          name: 'start_date',
          label: 'Start date',
          field: 'start_date',
          align: 'center',
          sortable: true,
        },
        {
          name: 'end_date',
          label: 'End Date',
          field: 'end_date',
          align: 'center',
          sortable: true,
        },
        {
          name: 'action',
          label: 'Actions',
          align: 'center',
        },
      ],
    };
  },

  methods: {
    refreshInputs() {
      this.nameClasses = '';
      this.startDate = '';
      this.endDate = '';
    },
    onSubmit() {
      const idCourse = (this.coursesOptions as ICourses[]).find(
        item => item.name == this.modelCourses,
      );

      const body = {
        name: this.nameClasses,
        start_date: this.startDate,
        end_date: this.endDate,
        id_course: idCourse?._id,
      };

      axios
        .post('/api/classes', body)
        .then(() => {
          this.populateTable();
          this.refreshInputs();
        })
        .catch(err => {
          this.$q.notify({
            message: `Error, check your console! ${err.message}`,
            position: 'top-right',
            icon: 'announcement',
            color: 'warning',
          });
        });
    },

    onEditSubmit() {
      const body = {
        name: this.nameClasses,
        start_date: this.startDate,
        end_date: this.endDate,
        id_course: this.editId,
      };

      axios
        .put('/api/classes', body)
        .then(() => {
          this.populateTable();
          this.refreshInputs();
        })
        .catch(err => {
          this.$q.notify({
            message: `Error, check your console! ${err.message}`,
            position: 'top-right',
            icon: 'announcement',
            color: 'warning',
          });
        });
    },

    async populateTable() {
      await axios.get('/api/classes').then(res => {
        this.classes = res.data;
      });
    },

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

      (this.coursesOptions as ICourses[]).map(item =>
        this.coursesSelectedOptions.push(item.name),
      );
    },

    deleteClasses(id: string) {
      axios.delete(`/api/courses/${id}`).then(() => {
        this.populateTable();
        this.refreshInputs();
      });
    },

    editClasses(id: string) {
      const classes: any = this.classes.find(classe => classe['_id'] == id);

      this.edit = true;
      this.editId = id;
      this.nameClasses = classes.name;
      this.startDate = classes.start_date;
      this.endDate = classes.end_date;
    },
  },

  mounted() {
    this.populateTable();
    this.populateOptionsCourses();
  },
});
</script>

<template>
  <div class="bg-cover w-screen h-screen flex p-2 bg-gray-900">
    <Header />
    <div
      class="w-[calc(100%-240px)] bg-white/20 backdrop-blur-sm duration-150 rounded-2xl py-5 relative h-[calc(100vh-20px)] ml-3 flex flex-col items-center text-white"
    >
      <div class="w-full flex p-10">
        <div class="w-full flex justify-between items-center rounded-md">
          <span class="text-xl uppercase tracking-wide font-bold"
            >Students - Classes</span
          >
          <q-btn
            label="Register"
            color="primary"
            @click="register = true"
            text-color="dark"
          />
        </div>
      </div>
      <!-- table -->
      <div class="w-full p-10">
        <q-table
          title="List of Students in Classes"
          :columns="columns"
          :rows="studentsClasses"
          separator="cell"
          row-key="_id"
          dense
          card-class="bg-backdrop backdropfilter"
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                icon="create"
                color="warning"
                size="sm"
                dense
                @click="editStudentClasses(props.row._id)"
              />
              <q-btn
                icon="delete"
                color="negative"
                size="sm"
                dense
                class="ml-2"
                @click="deleteStudentClasses(props.row._id)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>

  <!-- Modal Register -->

  <q-dialog class="" v-model="register">
    <q-card>
      <q-form
        class="flex flex-col justify-between h-[500px] w-[500px] bg-white p-10"
        @submit="onSubmit"
      >
        <span class="text-xl">Register</span>
        <q-select
          class="w-auto"
          outlined
          label="Classes"
          v-model="classesModel"
          :options="classesSelectOptions"
        />
        <q-select
          class="w-auto"
          outlined
          v-model="studentsModel"
          :options="studentsSelectOptions"
          label="Students"
        />
        <q-input
          outlined
          v-model="amoutClass"
          label="Number of classes"
          type="number"
          min="0"
        />

        <q-btn label="Register" color="primary" type="submit" v-close-popup />
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '../../components/header/Header.vue';
import axios from '../../services/axios';
import { QTableColumn, useQuasar } from 'quasar';

interface IclassesOptions {
  _id: string;
  id_course: {
    name: string;
    _id: string;
  };
  name: string;
  start_date: string;
}

interface IstudentsOptions {
  _id: string;
  name: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: 'StudentClasses',
  components: {
    Header,
  },

  data() {
    return {
      studentsClasses: [],
    };
  },

  setup() {
    const $q = useQuasar();
    return {
      register: ref(false),
      amoutClass: ref(0),
      classesOptions: ref([] as IclassesOptions[]),
      classesModel: ref(''),
      studentsOptions: ref([] as IstudentsOptions[]),
      studentsModel: ref(''),
      classesSelectOptions: ref([]),
      studentsSelectOptions: ref([]),
      $q,

      columns: [
        {
          name: '_id',
          label: 'Id',
          field: '_id',
          align: 'center',
          sortable: true,
        },
        {
          name: 'nameClasses',
          label: 'Name Classes',
          field: (row: { id_classes: { name: any } }) => row.id_classes.name,
          align: 'center',
          sortable: true,
        },
        {
          name: 'nameStudent',
          label: 'Name Student',
          field: (row: { id_student: { name: any } }) => row.id_student.name,
          align: 'center',
          sortable: true,
        },
        {
          name: 'amount_class',
          label: 'Amount Class',
          field: 'amount_class',
          align: 'center',
          sortable: true,
        },
        {
          name: 'action',
          label: 'Actions',
          align: 'center',
        },
      ] as QTableColumn[],
    };
  },

  methods: {
    async populateTable() {
      await axios
        .get('/api/classesstudents')
        .then(res => (this.studentsClasses = res.data))
        .catch(err =>
          this.$q.notify({
            message: `Error, check your console! ${err.message}`,
            position: 'top-right',
            icon: 'announcement',
            color: 'warning',
          }),
        );
    },

    async populateOptionsClasses() {
      await axios.get('/api/classes').then(res => {
        this.classesOptions = res.data;
      });

      (this.classesOptions as IclassesOptions[]).map(item =>
        (this.classesSelectOptions as string[]).push(item.name),
      );
    },

    async populateOptionsStudents() {
      await axios.get('/api/students').then(res => {
        this.studentsOptions = res.data;
      });
      // type

      (this.studentsOptions as IstudentsOptions[]).map(item =>
        (this.studentsSelectOptions as string[]).push(item.name),
      );
    },

    onSubmit() {
      const idStudent = this.studentsOptions.find(
        item => item.name == this.studentsModel,
      );

      const idClasses = this.classesOptions.find(
        item => item.name == this.classesModel,
      );

      const body = {
        id_classes: idClasses?._id,
        id_student: idStudent?._id,
        amount_class: +this.amoutClass,
      };

      axios.post('/api/classesstudents', body).then(() => {
        this.populateTable();
      });
    },
    editStudentClasses(id: string) {
      console.log(id);
    },
    deleteStudentClasses(id: string) {
      console.log(id);
    },
  },

  mounted() {
    this.populateTable();
    this.populateOptionsStudents();
    this.populateOptionsClasses();
  },
});
</script>

<template>
  <div class="bg-cover w-screen h-screen flex p-2 bg-gray-900">
    <Header></Header>
    <div
      class="w-[calc(100%-240px)] bg-white/50 backdrop-blur-sm duration-150 rounded-2xl py-5 relative h-[calc(100vh-20px)] ml-3 flex flex-col items-center text-white"
    >
      <div class="w-full flex p-10">
        <div class="w-full flex justify-between items-center rounded-md">
          <span class="text-xl uppercase tracking-wide font-bold"
            >Students</span
          >
          <q-btn label="Register" color="primary" @click="register = true" />
        </div>
      </div>
      <!-- table -->
      <div class="w-full p-10">
        <q-table
          title="List of Students"
          :columns="columns"
          :rows="students"
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

  <!-- Modal Register -->
  <q-dialog class="" v-model="register">
    <q-card>
      <q-form
        class="flex flex-col justify-between h-[500px] w-[500px] bg-white p-10"
        @submit="onSubmit"
      >
        <q-input outlined v-model="nameStudent" label="Name" />
        <q-input outlined v-model="ageStudent" label="Age" />
        <q-select
          class="w-auto"
          outlined
          v-model="modelGender"
          :options="genderOptions"
          label="Sexo"
        />
        <q-input outlined v-model="phoneStudent" label="Phone Number" />

        <q-btn label="Cadastrar" color="primary" type="submit" v-close-popup />
      </q-form>
    </q-card>
  </q-dialog>

  <!-- Modal edit -->
  <q-dialog class="" v-model="edit">
    <q-card>
      <q-form
        class="flex flex-col justify-between h-[500px] w-[500px] bg-white p-10"
        @submit="onEditSubmit"
      >
        <q-input outlined v-model="nameStudent" label="Name" />
        <q-input outlined v-model="ageStudent" label="Age" />
        <q-select
          class="w-auto"
          outlined
          v-model="modelGender"
          :options="genderOptions"
          label="Sexo"
        />
        <q-input outlined v-model="phoneStudent" label="Phone Number" />

        <q-btn label="Editar" color="primary" type="submit" v-close-popup />
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '../../components/header/Header.vue';
import axios from '../../services/axios';
import { useQuasar } from 'quasar';

interface StudentI {
  _id: string;
  name: string;
  createdAt: string;
  gender: string;
  age: string;
}

export default defineComponent({
  name: 'Student',
  components: {
    Header,
  },
  data() {
    return {
      students: [],
      selected: [],
    };
  },
  setup() {
    const $q = useQuasar();

    return {
      register: ref(false),
      edit: ref(false),
      editId: ref(''),
      nameStudent: ref(''),
      ageStudent: ref(''),
      genderStudent: ref(''),
      phoneStudent: ref(''),
      modelGender: ref(''),
      genderOptions: ['Masculino', 'Feminino'],
      columns: [
        {
          name: '_id',
          label: 'ID',
          field: '_id',
          align: 'center',
          sortable: true,
        },
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'center',
          sortable: true,
        },
        {
          name: 'age',
          label: 'Age',
          field: 'age',
          align: 'center',
          sortable: true,
        },
        {
          name: 'gender',
          label: 'Gender',
          field: 'gender',
          align: 'center',
          sortable: true,
        },
        {
          name: 'phone',
          label: 'Phone Number',
          field: 'phone',
          align: 'center',
          sortable: true,
          required: false,
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
      this.nameStudent = '';
      this.ageStudent = '';
      this.genderStudent = '';
      this.modelGender = '';
    },
    onSubmit() {
      const body = {
        name: this.nameStudent,
        age: this.ageStudent,
        gender: this.modelGender,
        phone: this.phoneStudent,
      };
      axios
        .post('/api/students', body)
        .then(() => {
          this.populatedTable();
          this.refreshInputs();
        })
        .catch(err =>
          this.$q.notify({
            message: `Error, check your console! ${err.message}`,
            position: 'top-right',
            icon: 'announcement',
            color: 'warning',
          }),
        );
    },

    onEditSubmit() {
      const body = {
        name: this.nameStudent,
        age: this.ageStudent,
        gender: this.modelGender,
        phone: this.phoneStudent,
      };

      axios
        .put('/api/student' + this.editId, body)
        .then(() => {
          this.populatedTable();
          this.refreshInputs();
          this.editId = '';
        })
        .catch(err =>
          this.$q.notify({
            message: `Error, check your console! ${err.message}`,
            position: 'top-right',
            icon: 'announcement',
            color: 'warning',
          }),
        );
    },

    async populatedTable() {
      await axios
        .get('/api/students')
        .then(res => {
          this.students = res.data;
          // console.log(res.data);
        })
        .catch(err =>
          this.$q.notify({
            message: `Error, check your console! ${err.message}`,
            position: 'top-right',
            icon: 'announcement',
            color: 'warning',
          }),
        );
    },

    editStudent(id: string) {
      const student: StudentI | any = this.students.find(
        student => student['_id'] == id,
      );
      this.edit = true;
      this.editId = id;
      this.nameStudent = student.name;
      this.ageStudent = student.age;
      this.modelGender = student.gender;
    },

    deleteStudent(id: string) {
      console.log(id);
      // axios.delete('/api/student'+id).then().catch()
    },
  },

  mounted() {
    this.populatedTable();
  },
});
</script>

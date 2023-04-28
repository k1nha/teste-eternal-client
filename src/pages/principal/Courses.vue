<template>
  <div class="bg-cover w-screen h-screen flex p-2 bg-gray-900">
    <Header></Header>
    <div
      class="w-[calc(100%-240px)] bg-white/50 backdrop-blur-sm duration-150 rounded-2xl py-5 relative h-[calc(100vh-20px)] ml-3 flex flex-col items-center text-white"
    >
      <div class="w-full flex p-10">
        <div class="w-full flex justify-between items-center rounded-md">
          <span class="text-xl uppercase tracking-wide font-bold">Courses</span>
          <q-btn label="Register" color="primary" @click="register = true" />
        </div>
      </div>

      <div class="w-full p-10">
        <q-table
          title="List of Courses"
          :columns="columns"
          :rows="courses"
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
                @click="editCourses(props.row._id)"
              />
              <q-btn
                icon="delete"
                color="negative"
                size="sm"
                dense
                class="ml-2"
                @click="deleteCourses(props.row._id)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>

  <!-- MODAL -->
  <q-dialog class="" v-model="register">
    <q-card>
      <q-form
        class="flex flex-col justify-between h-[380px] w-[500px] bg-white p-10"
        @submit="onSubmit"
      >
        <span class="text-xl">Register</span>
        <q-input outlined v-model="nameCourse" label="Name" />
        <q-input
          outlined
          v-model="descriptionCourse"
          label="Description"
          autogrow
        />

        <q-btn label="Cadastrar" color="primary" type="submit" v-close-popup />
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
  name: 'Courses',
  components: {
    Header,
  },
  data() {
    return {
      courses: [],
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      register: ref(false),
      nameCourse: ref(''),
      descriptionCourse: ref(''),

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
          sortable: 'true',
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
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
    async populatedTable() {
      await axios
        .get('/api/courses')
        .then(res => {
          this.courses = res.data;
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

    onSubmit() {
      const body = {
        name: this.nameCourse,
        description: this.descriptionCourse,
      };

      axios
        .post('/api/courses', body)
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
    editCourses(id: string) {
      console.log(id);
    },
    deleteCourses(id: string) {
      console.log(id);
    },

    refreshInputs() {
      this.nameCourse = '';
      this.descriptionCourse = '';
    },
  },
  mounted() {
    this.populatedTable();
  },
});
</script>

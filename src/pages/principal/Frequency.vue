<template>
  <div class="bg-cover w-screen h-screen flex p-2 bg-gray-900">
    <Header></Header>
    <div
      class="w-[calc(100%-240px)] bg-white/20 backdrop-blur-sm duration-150 rounded-2xl py-5 relative h-[calc(100vh-20px)] ml-3 flex flex-col items-center text-white"
    >
      <div class="w-full flex p-10">
        <div class="w-full flex justify-between items-center rounded-md">
          <span class="text-xl uppercase tracking-wide font-bold"
            >Frequency</span
          >
          <q-btn label="Register" color="primary" @click="register = true" />
        </div>
      </div>

      <!-- Table -->
      <div class="w-full p-10">
        <q-table
          title="List of Frequency"
          :columns="columns"
          :rows="frequencies"
          separator="cell"
          row-key="_id"
          dense
          card-class="bg-backdrop backdropfilter"
        >
          <template v-slot:body-cell-frequency="props">
            <q-td :props="props">
              <q-btn
                icon="swipe"
                color="info"
                size="sm"
                dense
                @click="editFrequency(props.row._id)"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-justify="props">
            <q-td :props="props">
              <q-btn icon="calendar_today" color="warning" size="sm" dense />
              <!--@click="justifyStudent(props.row._id)" -->
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn icon="create" color="warning" size="sm" dense />
              <!--@click="editActionFrequency(props.row._id)" -->
              <q-btn
                icon="delete"
                color="negative"
                size="sm"
                dense
                class="ml-2"
              />
              <!-- @click="deleteActionFrequency(props.row._id)" -->
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
        class="flex flex-col justify-between h-[580px] w-[500px] bg-white p-10"
        @submit="onSubmit"
      >
        <span class="text-xl">Register</span>

        <q-select
          class="w-auto"
          outlined
          v-model="idModel"
          :options="idSelectedOptions"
          label="ID"
        />

        <q-select
          class="w-auto"
          outlined
          v-model="classesStdModel"
          :options="classesSelectedOptions"
          label="Classes"
        />
        <q-select
          class="w-auto"
          outlined
          v-model="StdModel"
          :options="StdSelectedOptions"
          label="Student"
        />

        <q-input
          filled
          v-model="dateFrequency"
          mask="date"
          :rules="['date']"
          label="Date Frequency"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="dateFrequency">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-select
          class="w-auto"
          outlined
          :options="['Presente', 'Ausente']"
          label="Status"
          v-model="statusModel"
        />

        <q-btn label="Register" color="primary" type="submit" v-close-popup />
      </q-form>
    </q-card>
  </q-dialog>

  <!-- Modal Edit -->
  <q-dialog class="" v-model="edit">
    <q-card>
      <q-form
        class="flex flex-col justify-between h-[500px] w-[500px] bg-white p-10"
        @submit="onSubmit"
      >
        <span class="text-xl">Edit</span>

        <q-select
          class="w-auto"
          outlined
          v-model="idModel"
          :options="idSelectedOptions"
          label="ID"
        />

        <q-select
          class="w-auto"
          outlined
          v-model="classesStdModel"
          :options="classesSelectedOptions"
          label="Classes"
        />
        <q-select
          class="w-auto"
          outlined
          v-model="StdModel"
          :options="StdSelectedOptions"
          label="Student"
        />

        <q-select
          class="w-auto"
          outlined
          :options="['Presente', 'Ausente']"
          label="Status"
          v-model="statusModel"
        />

        <q-btn label="Cadastrar" color="primary" type="submit" v-close-popup />
      </q-form>
    </q-card>
  </q-dialog>

  <!-- MODAL JUSTIFY -->
  <q-dialog class="" v-model="justify">
    <q-card>
      <q-form
        class="flex flex-col justify-between h-[500px] w-[500px] bg-white p-10"
        @submit="onSubmit"
      >
        <span class="text-xl">Register</span>

        <q-select
          class="w-auto"
          outlined
          v-model="classesStdModel"
          :options="classesSelectedOptions"
          label="Classes"
        />
        <q-select
          class="w-auto"
          outlined
          v-model="StdModel"
          :options="StdSelectedOptions"
          label="Student"
        />

        <q-btn label="Cadastrar" color="primary" type="submit" v-close-popup />
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '../../components/header/Header.vue';
import { QTableColumn, useQuasar } from 'quasar';
import axios from '../../services/axios';

interface IclassesStdOptions {
  _id: string;
  id_classes: {
    name: string;
    _id: string;
  };
  id_student: {
    name: string;
    _id: string;
  };
  amount_class: number;
}

export default defineComponent({
  name: 'Frequency',
  components: {
    Header,
  },
  data() {
    return {
      frequencies: [],
    };
  },
  setup() {
    const $q = useQuasar();

    return {
      register: ref(false),
      justify: ref(false),
      edit: ref(false),
      idModel: ref(''),
      dateFrequency: ref(''),
      idSelectedOptions: ref([]),
      statusModel: ref(''),
      classesStdModel: ref(''),
      classesStdOptions: ref([] as IclassesStdOptions[]),
      classesSelectedOptions: ref([]),
      StdModel: ref(''),
      StdSelectedOptions: ref([]),
      columns: [
        {
          name: 'name_classes',
          label: 'Name Classe',
          field: row => row.id_Classes_Students.id_classes.name,
          align: 'center',
          sortable: true,
        },
        {
          name: 'name_student',
          label: 'Name Student',
          field: row => row.id_Classes_Students.id_student.name,
          align: 'center',
          sortable: true,
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'center',
          sortable: true,
        },
        {
          name: 'frequency',
          label: 'Frequency',
          align: 'center',
        },
        {
          name: 'justify',
          label: 'Justify',
          align: 'center',
        },
        {
          name: 'action',
          label: 'Actions',
          align: 'center',
        },
      ] as QTableColumn[],
      $q,
    };
  },
  methods: {
    onSubmit() {
      const body = {
        id_Classes_Students: this.idModel,
        date: this.dateFrequency,
        status: this.statusModel,
      };

      axios.post('/api/frequency', body).then(() => {
        this.populateTable();
        // Clean Inputs
      });
    },
    async populateTable() {
      await axios
        .get('/api/frequency')
        .then(res => (this.frequencies = res.data));
    },

    async populateOptions() {
      await axios.get('/api/classesstudents').then(res => {
        this.classesStdOptions = res.data;
        console.log(res.data);
      });

      this.classesStdOptions.map(item =>
        (this.classesSelectedOptions as string[]).push(item.id_classes.name),
      );

      this.classesStdOptions.map(item =>
        (this.StdSelectedOptions as string[]).push(item.id_student.name),
      );

      this.classesStdOptions.map(item =>
        (this.idSelectedOptions as string[]).push(item._id),
      );
    },

    showStudentsInClass() {
      const idClasses = this.classesStdOptions.find(
        item => item.id_classes.name == this.classesStdModel,
      );
      console.log(idClasses);
    },

    editFrequency(id: string) {
      console.log(id);
    },
  },

  mounted() {
    this.populateTable();
    this.populateOptions();
  },
});
</script>

<template>
  <div class="bg-cover w-screen h-screen flex p-2 bg-gray-900">
    <Header></Header>
    <div
      class="w-[calc(100%-240px)] bg-white/20 backdrop-blur-sm duration-150 rounded-2xl py-5 relative h-[calc(100vh-20px)] ml-3 flex flex-col items-center text-white"
    >
      <div class="w-full flex p-10">
        <div class="w-full flex justify-between items-center rounded-md">
          <span class="text-xl uppercase tracking-wide font-bold">Finance</span>
          <q-btn
            label="Register"
            color="primary"
            @click="register = true"
            text-color="dark"
          />
        </div>
      </div>

      <div class="w-full p-10">
        <q-table
          title="List of Finance"
          :columns="columns"
          :rows="finances"
          separator="cell"
          row-key="_id"
          dense
          card-class="bg-backdrop backdropfilter"
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn icon="create" color="warning" size="sm" dense />
              <!--@click="editStudent(props.row._id)" -->
              <q-btn
                icon="delete"
                color="negative"
                size="sm"
                dense
                class="ml-2"
              />
              <!-- @click="deleteStudent(props.row._id)" -->
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '../../components/header/Header.vue';
import axios from '../../services/axios';
import { QTableColumn } from 'quasar';

export default defineComponent({
  name: 'Finance',
  components: {
    Header,
  },
  data() {
    return {
      finances: [],
    };
  },
  setup() {
    return {
      register: ref(false),
      columns: [
        {
          name: 'name_student',
          label: 'Student name',
          field: (row: {
            id_frequency: {
              id_Classes_Students: { id_student: { name: any } };
            };
          }) => row.id_frequency.id_Classes_Students.id_student.name,
          align: 'center',
          sortable: true,
        },
        {
          name: 'name_classes',
          label: 'Name Classes',
          field: (row: {
            id_frequency: {
              id_Classes_Students: { id_classes: { name: any } };
            };
          }) => row.id_frequency.id_Classes_Students.id_classes.name,
          align: 'center',
          sortable: true,
        },
        {
          name: 'payment_status',
          label: 'Payment Status',
          field: 'payment_status',
          align: 'center',
          sortable: true,
        },
        {
          name: 'payment_type',
          label: 'Payment Type',
          field: 'payment_type',
          align: 'center',
          sortable: true,
        },
        {
          name: 'payment_date',
          label: 'Payment Date',
          field: 'payment_date',
          align: 'center',
          sortable: true,
        },
        {
          name: 'payment_amount',
          label: 'Payment Amount',
          field: 'payment_amount',
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
      await axios.get('/api/finances').then(res => {
        this.finances = res.data;
      });
    },
  },
  mounted() {
    this.populateTable();
  },
});
</script>

<script>
import axios from "axios";

export default {
  name: "PeopleView",

  data() {
    return {
      loadingBotton: false,
      modalShow: false,
      people: [],
      person: {},
      currentPage: 1,
      rows: 0,
      perPage: 10,
      loading: true,
      fields: [
        { label: "Name", key: "name" },
        { label: "Birth year", key: "birth_year" },
        { label: "Gender", key: "gender" },
        { label: "Eye color", key: "eye_color" },
        { label: "Hair color", key: "hair_color" },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  mounted() {
    this.getPeople();
  },
  watch: {
    currentPage() {
      this.getPeople();
    },
  },
  methods: {
    info(item) {
      this.getPerson(item.url);
    },
    getPerson(url) {
      this.loadingBotton = true;
      const request = axios.get(url);
      request.then((response) => {
        this.person = response.data;
      });
      request.finally(() => {
        this.modalShow = !this.modalShow;
        this.loadingBotton = false;
      });
    },
    getPeople() {
      this.loading = true;
      var url = `https://swapi.dev/api/people//?page=${this.currentPage}`;
      const request = axios.get(url);
      request.then((response) => {
        this.rows = response.data.count;
        this.people = response.data.results.map((result) => {
          return {
            name: result.name,
            birth_year: result.birth_year,
            gender: result.gender,
            eye_color: result.eye_color,
            hair_color: result.hair_color,
            url: result.url,
          };
        });
      });
      request.finally(() => (this.loading = false));
    },
  },
};
</script>

<template>
  <b-container>
    <div class="my-5">
      <div v-if="!loading">
        <b-table striped :fields="fields" :items="people" responsive="sm">
          <template #cell(actions)="row">
            <b-overlay
              :show="loadingBotton"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
              class="d-inline-block"
            >
              <b-button
                ref="button"
                :disabled="loadingBotton"
                variant="primary"
                @click="info(row.item)"
              >
                Detailed Info
              </b-button>
            </b-overlay>
          </template>
        </b-table>
        <div class="d-flex flex-row justify-content-center alig-items-center">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </div>
      </div>

      <div class="text-center" v-else>
        <b-spinner style="width: 3rem; height: 3rem" label="Loading"></b-spinner>
      </div>
    </div>
    <div>
      <b-modal v-model="modalShow" title="Detailed info">
        <b-card :title="person.name">
          <b-card-text>
            <b-list-group>
              <b-list-group-item>Birth year : {{ person?.birth_year }}</b-list-group-item>
              <b-list-group-item>Gender : {{ person?.gender }}</b-list-group-item>
              <b-list-group-item>Height : {{ person?.height }} cm</b-list-group-item>
              <b-list-group-item>Mass : {{ person?.mass }} kg</b-list-group-item>
              <b-list-group-item>Films: {{ person?.films?.length }}</b-list-group-item>
              <b-list-group-item>Eye color: {{ person?.eye_color }}</b-list-group-item>
            </b-list-group>
          </b-card-text>
        </b-card>
      </b-modal>
    </div>
  </b-container>
</template>

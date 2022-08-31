<script>
import axios from "axios";

export default {
  name: "PlanetsView",

  data() {
    return {
      loadingBotton: false,
      modalShow: false,
      planets: [],
      planet: {},
      currentPage: 1,
      rows: 0,
      perPage: 10,
      loading: true,
      fields: [
        { label: "Name", key: "name" },
        { label: "gravity", key: "gravity" },
        { label: "Orbital period", key: "orbital_period" },
        { label: "population", key: "population" },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  mounted() {
    this.getPlanets();
  },
  watch: {
    currentPage() {
      this.getPlanets();
    },
  },
  methods: {
    info(item) {
      this.getPlanet(item.url);
    },
    getPlanet(url) {
      this.loadingBotton = true;
      const request = axios.get(url);
      request.then((response) => {
        this.planet = response.data;
      });
      request.finally(() => {
        this.modalShow = !this.modalShow;
        this.loadingBotton = false;
      });
    },
    getPlanets() {
      this.loading = true;
      var url = `https://swapi.dev/api/planets//?page=${this.currentPage}`;
      const request = axios.get(url);
      request.then((response) => {
        this.rows = response.data.count;
        this.planets = response.data.results.map((result) => {
          return {
            name: result.name,
            gravity: result.gravity,
            orbital_period: result.orbital_period,
            population: result.population,
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
        <b-table striped :fields="fields" :items="planets" responsive="sm">
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
        <b-card :title="planet.name">
          <b-card-text>
            <b-list-group>
              <b-list-group-item>terrain : {{ planet?.terrain }}</b-list-group-item>
              <b-list-group-item
                >Surface water : {{ planet?.surface_water }}</b-list-group-item
              >
              <b-list-group-item
                >Rotation period : {{ planet?.height }}
              </b-list-group-item>
              <b-list-group-item
                >Orbital period : {{ planet?.orbital_period }}
              </b-list-group-item>
              <b-list-group-item>Gravity: {{ planet?.gravity }}</b-list-group-item>
              <b-list-group-item>Population: {{ planet?.population }}</b-list-group-item>
              <b-list-group-item>Climate: {{ planet?.climate }}</b-list-group-item>
              <b-list-group-item>Films: {{ planet?.films?.length }}</b-list-group-item>
            </b-list-group>
          </b-card-text>
        </b-card>
      </b-modal>
    </div>
  </b-container>
</template>

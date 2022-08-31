<script>
import axios from "axios";

export default {
  name: "StarShipsView",

  data() {
    return {
      loadingBotton: false,
      modalShow: false,
      starShips: [],
      starShip: {},
      currentPage: 1,
      rows: 0,
      perPage: 10,
      loading: true,
      fields: [
        { label: "Name", key: "name" },
        { label: "Model", key: "model" },
        { label: "MGLT", key: "MGLT" },
        { label: "Crew", key: "crew" },
        { label: "Passengers", key: "passengers" },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  mounted() {
    this.getStarships();
  },
  watch: {
    currentPage() {
      this.getStarships();
    },
  },
  methods: {
    info(item) {
      this.getStarShip(item.url);
    },
    getStarShip(url) {
      this.loadingBotton = true;
      const request = axios.get(url);
      request.then((response) => {
        this.starShip = response.data;
      });
      request.finally(() => {
        this.modalShow = !this.modalShow;
        this.loadingBotton = false;
      });
    },
    getStarships() {
      this.loading = true;
      var url = `https://swapi.dev/api/starships//?page=${this.currentPage}`;
      const request = axios.get(url);
      request.then((response) => {
        this.rows = response.data.count;
        this.starShips = response.data.results.map((result) => {
          return {
            name: result.name,
            model: result.model,
            MGLT: result.MGLT,
            crew: result.crew,
            passengers: result.passengers,
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
        <b-table striped :fields="fields" :items="starShips" responsive="sm">
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
        <b-card :title="starShip.name">
          <b-card-text>
            <b-list-group>
              <b-list-group-item>Model : {{ starShip?.model }}</b-list-group-item>
              <b-list-group-item>Starship class : {{ starShip?.starship_class }}</b-list-group-item>
              <b-list-group-item>MGLT : {{ starShip?.MGLT }}</b-list-group-item>
              <b-list-group-item>Cargo capacity : {{ starShip?.cargo_capacity }}</b-list-group-item>
              <b-list-group-item>Consumables : {{ starShip?.consumables }}</b-list-group-item>
              <b-list-group-item>Cost in credits : {{ starShip?.cost_in_credits }}</b-list-group-item>
              <b-list-group-item>Hyperdrive rating : {{ starShip?.hyperdrive_rating }}</b-list-group-item>
              <b-list-group-item>Manufacturer : {{ starShip?.manufacturer }}</b-list-group-item>
              <b-list-group-item>Films: {{ starShip?.films?.length }}</b-list-group-item>
              <b-list-group-item>Pilots: {{ starShip?.pilots?.length }}</b-list-group-item>
            </b-list-group>
          </b-card-text>
        </b-card>
      </b-modal>
    </div>
  </b-container>
</template>

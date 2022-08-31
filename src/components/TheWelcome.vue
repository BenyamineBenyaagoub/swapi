<template>
  <b-template>
    <div class="d-flex justify-content-center my-5 py-5">
      <div class="col-3">
        <b-card
          title="Planets"
          img-src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/coruscant-planet-1590423627.jpg"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </b-card-text>

          <b-button href="#" variant="primary"
            ><RouterLink to="/planets">See more</RouterLink></b-button
          >
        </b-card>
      </div>
      <div class="col-3">
        <b-card
          title="People"
          img-src="https://i.blogs.es/8b6e97/baby/450_1000.jpeg"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </b-card-text>
          <b-button href="#" variant="primary"
            ><RouterLink to="/people">See more</RouterLink></b-button
          >
        </b-card>
      </div>
      <div class="col-3">
        <b-card
          title="Starships"
          img-src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2017/11/10/15103170397780.jpg"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </b-card-text>

          <b-button href="#" variant="primary"
            ><RouterLink to="/starships">See more</RouterLink></b-button
          >
        </b-card>
      </div>
    </div>
  </b-template>
</template>

<template>
  <div class="component">
    <form @submit="submit">
      <div class="header">
        Leave us a review, we'd appreciate it.
      </div>

      <b-field v-bind:message="errors.starRating && 'required'">
        <star-rating class="stars" v-model="fields.starRating"></star-rating>
      </b-field>

      <b-field label="Variant" v-bind:message="errors.device && 'required'">
        <b-select
          placeholder="Select a variant"
          v-model="fields.device"
          rounded
        >
          <option value="Charcoal Fabric">Charcoal Fabric</option>
          <option value="Sandstone Fabric">Sandstone Fabric</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Walnut Finish">Walnut Finish</option>
          <option value="Heather Gray Fabric">Heather Gray Fabric</option>
          <option value="Oak Finish">Oak Finish</option>
        </b-select>
      </b-field>

      <b-field label="Review" v-bind:message="errors.review && 'required'">
        <b-input
          type="textarea"
          minlength="10"
          maxlength="500"
          placeholder="Tell us your thoughts"
          v-model="fields.review"
        ></b-input>
      </b-field>

      <div class="buttons">
        <b-button rounded v-bind:loading="isSubmitting" native-type="submit"
          >Add Review</b-button
        >
      </div>
    </form>
    <div class="firebase-error" v-show="firebaseError">
      A Firebase Error Occurred.
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import faker from "faker";

import db, { SERVER_TIMESTAMP } from "../firebase";

export default {
  name: "Widget",
  components: {
    StarRating,
  },
  data: () => ({
    errors: {
      device: false,
      starRating: false,
      review: false,
    },
    fields: {
      device: null,
      starRating: null,
      review: null,
    },
    imageURL: faker.image.avatar(),
    isSubmitting: false,
    firebaseError: false,
  }),
  methods: {
    clearForm: function() {
      Object.keys(this.fields).map((field) => {
        this.fields[field] = null;
      });
    },
    submit: function(e) {
      e.preventDefault();
      this.isSubmitting = true;
      const { fields, imageURL } = this;

      let hasErrors = false;
      Object.keys(fields).map((field) => {
        const val = fields[field];
        if (!val) {
          this.errors[field] = true;
          hasErrors = true;
        } else {
          this.errors[field] = false;
        }
      });

      if (hasErrors) {
        this.isSubmitting = false;
        return;
      }

      db.collection("reviews")
        .add({
          imageURL,
          ...fields,
          createdAt: SERVER_TIMESTAMP,
        })
        .then(() => {
          this.isSubmitting = false;
          this.clearForm();
        })
        .catch((error) => {
          this.isSubmitting = false;
          this.firebaseError = true;
          console.log("FIREBASE ERROR", error);
        });
    },
  },
};
</script>

<style scoped>
.component {
  box-sizing: border-box;
  padding: 32px 16px;
  border: solid 1px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  width: 100%;
  max-width: 450px;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
}

.header {
  text-align: center;
  font-weight: bold;
}

.stars {
  margin: auto;
  width: fit-content;
  color: black;
}

.firebase-error {
  background: indianred;
  color: white;
  padding: 4px;
  border-radius: 4px;
  margin-top: 16px;
}
</style>

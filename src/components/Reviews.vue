<template>
  <div class="component">
    <strong>Latest Reviews</strong>
    <div class="reviews">
      <!-- <transition-group name="list" tag="div"> -->
      <template v-for="review in reviews">
        <div class="review" v-bind:key="review.id">
          <div class="stars-and-user">
            <img class="user-image" v-bind:src="review.imageURL" />
            <star-rating
              class="stars"
              v-bind:rating="review.starRating"
              v-bind:show-rating="false"
              star-size="20"
              read-only
            ></star-rating>
          </div>
          <div class="createdAt">
            {{ prettyDate(review.createdAt.toDate()) }}
          </div>
          <div class="text">{{ review.review }}</div>
        </div>
      </template>
      <!-- </transition-group> -->
    </div>
  </div>
</template>

<script>
import * as moment from "moment";
import StarRating from "vue-star-rating";

import db from "../firebase";

export default {
  name: "reviews",
  components: {
    StarRating,
  },
  data: () => ({
    reviews: [],
  }),
  methods: {
    prettyDate: function(date) {
      return moment(date).calendar();
    },
  },
  created: function() {
    db.collection("reviews")
      .limit(3)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const reviews = [];
        querySnapshot.forEach((doc) => {
          const d = doc.data();
          reviews.push(d);
        });
        this.reviews = reviews;
      });
  },
};
</script>

<style scoped>
.component {
  width: 100%;
  max-width: 450px;
}

.review {
  display: grid;
  grid-template-areas:
    "stars-and-user createdAt"
    "text text";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 28px auto;
  padding: 16px 12px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px;
}

.user-image {
  grid-area: user-image;
  height: 28px;
  width: 28px;
  border-radius: 100%;
}

.stars-and-user {
  grid-area: stars-and-user;
  text-align: left;
  display: flex;
}

.stars {
  margin: 0 8px;
}

.createdAt {
  grid-area: createdAt;
  text-align: right;
  font-size: 12px;
}

.text {
  grid-area: text;
  padding: 8px 0;
}
</style>

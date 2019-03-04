<template>
  <div>
    <div class="datepicker-trigger" v-if="nights.length === 0">
      <input
        type="text"
        id="datepicker-trigger"
        placeholder="Je suis au chalet du ... au ..."
        :value="formatDates(startAt, endAt)"
      />

      <AirbnbStyleDatepicker
        :trigger-element-id="'datepicker-trigger'"
        :mode="'range'"
        :fullscreen-mobile="true"
        :date-one="startAt"
        :date-two="endAt"
        @date-one-selected="
          val => {
            startAt = val
          }
        "
        @date-two-selected="
          val => {
            endAt = val
          }
        "
      />
    </div>

    <div v-else>
      <h4>{{ stayTitle }}</h4>
      <div class="table-container">
        <div style="float: right;">
          <span>Tarif famille </span>
          <toggle-button v-model="familyPricing" :labels="true" />
        </div>
        <table>
          <thead>
            <th>Nuitée</th>
            <th>Nb de personnes</th>
            <th>Coût</th>
          </thead>
          <tbody>
            <tr v-for="(night, i) in nights" :key="i">
              <td>{{ format(night[0], "DD MMM YYYY") }}</td>
              <td><input type="number" min="0" v-model="night[1]" /></td>
              <td>{{ priceForOneNight(night[1]) }} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>
        Total: <strong>{{ total }} €</strong>
      </h2>

      <div>
        <h3>Partager</h3>
        <input type="text" readonly :value="shareUrl" />
      </div>

      <button class="button-clear" @click="clear">Recommencer...</button>
    </div>
  </div>
</template>

<script>
import { addDays, format, differenceInDays } from "date-fns";
import fr from "date-fns/locale/fr";

export default {
  data() {
    return {
      dateFormat: "D MMM",
      startAt: "",
      endAt: "",
      familyPricing: false,
      nights: [],
      rates: {
        normal: {
          nightBase: 70,
          additionalPerson: 7
        },
        family: {
          nightBase: 35,
          additionalPerson: 8
        }
      },
      format,
      fr
    };
  },
  computed: {
    currentPricing() {
      if (this.familyPricing) {
        return this.rates.family;
      } else {
        return this.rates.normal;
      }
    },
    nightsCount() {
      return differenceInDays(this.endAt, this.startAt);
    },
    total() {
      if (this.nights.length === 0) {
        return 0;
      } else {
        let total = 0;

        this.nights.forEach(d => (total += this.priceForOneNight(d[1])));

        return total;
      }
    },
    shareUrl() {
      if (this.nights.length > 0) {
        let baseUri = window.location.origin;
        let stringifiedNights = JSON.stringify(this.nights);

        baseUri = baseUri + "?nights=" + stringifiedNights
        if (this.familyPricing) {
          baseUri = baseUri + "&family=true"
        }

        return baseUri
      }
    },
    stayTitle() {
      let start = format(this.nights[0][0], "DD MMMM YYYY", { locale: fr });
      let end = format(
        addDays(this.nights[this.nights.length - 1][0], 1),
        "DD MMMM YYYY",
        { locale: fr }
      );
      return `Je suis au chalet du ${start} au ${end}`;
    }
  },
  watch: {
    nightsCount() {
      if (this.nightsCount) {
        this.nights = [];

        for (let i = 0; i < this.nightsCount; i++) {
          this.nights.push([addDays(this.startAt, i), 0]);
        }
      }
    }
  },
  methods: {
    formatDates(startAt, endAt) {
      let formattedDates = "";
      if (startAt) {
        formattedDates = format(startAt, this.dateFormat);
      }
      if (endAt) {
        formattedDates += " - " + format(endAt, this.dateFormat);
      }
      return formattedDates;
    },
    priceForOneNight(peopleCount) {
      if (peopleCount <= 2) {
        return this.currentPricing.nightBase;
      }
      return (
        this.currentPricing.nightBase +
        (peopleCount - 2) * this.currentPricing.additionalPerson
      );
    },
    clear() {
      this.startAt = "";
      this.endAt = "";
      this.nights = [];
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get("family"))
    this.familyPricing = urlParams.get("family") === 'true'
    if (urlParams.get("nights")) {
      this.nights = JSON.parse(urlParams.get("nights"));
    }
  }
};
</script>
<style scoped>
input {
  max-width: 30em;
}
table-container {
  max-width: 50em;
  margin: auto;
}
h2 {
  margin-top: 1em;
}
</style>

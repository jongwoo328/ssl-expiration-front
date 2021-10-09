<template>
  <div class="mt-4">
    <div class="d-flex flex-row justify-content-end">
      <button @click="getData" class="btn btn-primary">새로고침</button>
    </div>
    <table class="table mt-3">
      <thead>
        <th scope="col">도메인</th>
        <th scope="col">일수</th>
        <th scope="col"></th>
      </thead>
      <tbody>
        <Tr v-for="domain in domains" :key="domain.domain" :data="domain" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAllDomainExpire } from "@/apis/domain";
import Tr from "@/components/Tr.vue";

export default {
  name: "Table",
  components: {
    Tr,
  },
  data() {
    return {
      domains: [],
    };
  },
  async mounted() {
    try {
      const results = await getAllDomainExpire();
      this.domains = results.data;
    } catch (err) {
      alert(err);
    }
  },
  methods: {
    async getData(e) {
      if (e.target.disabled) return;
      e.target.textContent = "로드 중";
      e.target.disabled = true;
      try {
        const results = await getAllDomainExpire();
        this.domains = results.data;
      } catch (err) {
        alert(err);
      } finally {
        e.target.textContent = "새로고침";
        e.target.disabled = false;
      }
    },
  },
};
</script>

<style>
</style>
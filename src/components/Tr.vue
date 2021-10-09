<template>
  <tr class="align-middle">
    <td>{{ domainData.domain }}</td>
    <td>{{ domainData.remain }}</td>
    <td>
      <div class="d-flex justify-content-around align-items-center">
        <i @click="getData" class="bi bi-arrow-clockwise"></i>
        <lottie-player
          src="https://assets8.lottiefiles.com/datafiles/jXqHQIXI6oO6V47/data.json"
          mode="bounce"
          background="transparent"
          speed="1"
          width="14px"
          height="14px"
        ></lottie-player>
      </div>
    </td>
  </tr>
</template>

<script>
import { getDomainExpire } from "@/apis/domain";

export default {
  name: "Td",
  data() {
    return {
      reloadable: true,
      computedData: null,
    };
  },
  props: {
    data: {
      domain: String,
      remain: Number,
    },
  },
  computed: {
    domainData() {
      return this.computedData || this.data;
    },
  },
  methods: {
    async getData(e) {
      if (!this.reloadable) return;
      const lottie = e.target.parentNode.childNodes[1];
      lottie.load(
        "https://assets8.lottiefiles.com/datafiles/jXqHQIXI6oO6V47/data.json"
      );
      lottie.addEventListener("complete", () => {
        setTimeout(() => {
          lottie.seek(0);
          lottie.stop();
        }, 2000);
      });
      this.reloadable = false;
      e.target.parentNode.parentNode.style.backgroundColor = "lightgray";
      try {
        const result = await getDomainExpire(this.domainData.domain);
        this.computedData = result.data;
        e.target.parentNode.childNodes[1].play();
      } catch (err) {
        alert(err);
        lottie.load(
          "https://assets3.lottiefiles.com/packages/lf20_jnldinba.json"
        );
        lottie.play();
      } finally {
        this.reloadable = true;
        e.target.parentNode.parentNode.style.backgroundColor = "white";
      }
    },
  },
};
</script>

<style>
i.bi {
  border-radius: 5px;
}
i.bi:hover {
  cursor: pointer;
  background-color: lightgray;
}
lottie-player {
  width: 30px;
  height: 31px;
}
</style>
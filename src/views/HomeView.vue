<template>
  <div class="home">
    <div class="banner">
      <div class="content">
        <h1>ก้าวไปข้างหน้าได้ด้วยการปรึกษา</h1>
        <h1>“กันและกัน”</h1>
        <p>
          เพื่อความเป็นระเบียบ แบบแผน และความรวดเร็ว
          เราจึงจัดทำเว็ปไซต์สำหรับจองห้องประชุม ภายในบริษัท ปิยะวัตร จำกัด
        </p>
        <button>จองทันที</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  // components: {
  //   HelloWorld,
  // },
};
</script>

<style scoped>
h1,
p {
  color: white;
}

.banner {
  position: relative; /* Ensure the pseudo-element is positioned relative to this */
  height: 500px;
  padding: 171px 216px 0 216px;
  background: url("../assets/meeting.png") center/cover no-repeat; /* Simplified background shorthand */
  color: white;
}

.banner::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Adjust the opacity as needed */
}

.banner h1,
.banner p {
  position: relative; /* Ensure text remains on top of the overlay */
  z-index: 1; /* Ensure text remains on top of the overlay */
}

.content {
  width: 100%;
  max-width: 615px;
}
</style>

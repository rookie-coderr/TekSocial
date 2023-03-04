<template>

    <div class="sidenavbar">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />

        <!-- nav-link start -->
        <nav class="nav-link" :class="`${is_expanded ? 'is-expanded' : ''}`">
            
            <ul :class="`${ is_expanded ? 'toggle-nav-item' : 'show-full-nav-item'}`">
                <div class="toggle-menu" @click="ToggleMenu">
                    <i class="fa-solid fa-bars btn-open"></i>
                    <i class="fa-solid fa-close btn-close"></i>
                </div>
                <a href="#home">
                    <li><i class="fa-solid fa-house"></i> Home</li>
                </a>
                <a href="#about">
                    <li><i class="fa-solid fa-user"></i> About</li>
                </a>
                <a href="#project">
                    <li><i class="fa-solid fa-folder"></i> Project</li>
                </a>
                <footer>
                    <a href="#project">
                        <li><i class="fa-solid fa-sign-out"></i> Log out</li>
                    </a>
                </footer>
            </ul>

            <!-- item navigasi saat lebar area diberi ukuran yang lebih besar atau ketika hamburger menu di klik -->
            <!-- <ul class="full-nav-item">
                <a href="#home">
                    <li><i class="fa-solid fa-house"></i>Home</li>
                </a>
                <a href="#about">
                    <li><i class="fa-solid fa-user"></i> About</li>
                </a>
                <a href="#project">
                    <li><i class="fa-solid fa-sign-out"></i> Log Out</li>
                </a>
            </ul> -->
        </nav>
       
    </div>
    <!-- <ProfileDetails :is-expanded="is-expanded" > -->
        <!-- any other content you want to pass to ProfilePage -->
    <!-- </ProfileDetails> -->
   
</template>


<script setup>

import { ref } from "vue";


const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value;
    localStorage.setItem("is_expanded", is_expanded.value);
};


// const btnOpen = document.querySelector('.btn-open');
// const btnClose = document.querySelector('.btn-close');
// const fullNavItem = document.querySelector('.full-nav-item');

// // jalankan fungsi ketika hamburger menu di klik
// btnOpen.addEventListener('click', () => {
//     // tambahkan class baru pada navbar area
//     fullNavItem.classList.add('show-full-nav-item');
//     // tambahkan class baru pada bagian content
//     document.querySelector('.wrapper-header').classList.add('swipe-wrapper-header');
//     if (fullNavItem.classList.contains('show-full-nav-item')) {
//         // tampilkan tombol close
//         btnClose.style.display = 'block';
//         // sembunyikan tombol open
//         btnOpen.style.display = 'none';
//     };
//     // buat function untuk menjalankan fungsi tombol close
//     activateBtnClose();
// });

// // menjalankan fungsi tombol close
// function activateBtnClose() {
//     btnClose.addEventListener('click', () => {
//         // hapus class pada navbar area
//         fullNavItem.classList.remove('show-full-nav-item');
//         // hapus class pada bagian content
//         document.querySelector('.wrapper-header').classList.remove('swipe-wrapper-header');
//         if (!fullNavItem.classList.contains('show-full-nav-item')) {
//             // sembunyikan tombol close
//             btnClose.style.display = 'none';
//             // tampilkan tombol open
//             btnOpen.style.display = 'block';
//         };
//     });
// };


</script>


<!-- <script>
import ProfileDetails from './ProfileDetails.vue'

export default {
  
  data() {
    return {
      isExpanded : false,
    }
  },
  methods: {
    ToggleMenu() {
      this.isExpanded = !this.isExpanded

    }
  }


}
</script> -->

<style lang="scss" scoped>
/* font family google api */
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

/* reset all style */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}

/* set html & body style */
html,
body {
    font-weight: normal;
    font-style: normal;
    line-height: 1.65;
    scroll-behavior: smooth;
    font-family: "Roboto", sans-serif;
    color: rgb(26, 27, 27);
}

/* menyembunyikan konten yang melebihi luas body */
body {
    overflow-x: hidden;
}

a {
    color: rgb(186, 187, 187);
}

i {
    cursor: pointer;
}

/* brand-logo style */




/* toggle-menu style */
.toggle-menu {

    width: 100px;
    height: 50px;
    border-radius: 0px;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    color: rgb(186, 187, 187);

}


.toggle-menu i {
    position: absolute;
}

.toggle-menu .btn-close {
    display: none;
    transition: all 0.3s;
}

.toggle-menu .btn-close:hover {
    transition: all 0.3s;
}

.toggle-menu:hover {
    border-radius: 50%;
    background-color: rgb(52, 53, 53);
}

/* tampilan navigasi sebelum humberger menu di klik */
.toggle-nav-item {
    margin: 0px;
    height: 100%;
    padding: 0.6em;
    position: fixed;
    left: 0;
    z-index: 1;
    background-color: rgb(26, 27, 27);
    transition: width 0.3s ease-out;

}



.toggle-nav-item a li {
    padding: 1em;
    border-radius: 10px;
    font-size: 0.7rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    transition: all 0.3s;


}

.toggle-nav-item i {
    font-size: 1.4rem;
    margin-bottom: 0.15em;
    transition: all 0.3s;
}

.toggle-nav-item a li:hover {
    background-color: rgb(52, 53, 53);
    transition: all 0.3s;
    
}

/* tampilan navigasi saat humberger menu sudah di klik */

.show-full-nav-item {
    margin: 0px;
    height: 100%;
    position: fixed;
    left: 0;
    z-index: 1;
    background-color: rgb(26, 27, 27);
    transition: width 0.3s ease-out;

}

.show-full-nav-item a li {
    padding: 1.25em;
    border-radius: 10px;
    display: flex;
    transition: all 0.3s;
}

.show-full-nav-item a li:hover {
    padding-left: 2em;
    background-color: rgb(52, 53, 53);
    transition: all 0.3s;
}

.show-full-nav-item i {
    z-index: 1;
    width: 20px;
    margin-right: 2em;
    transition: all 0.3s;
}

/* class tambahan untuk mengubah style display:none pada class full-nav-item */


/* wrapper-header style */
.wrapper-header {
    width: 100%;
    padding-left: 2em;
    padding-right: 6.4em;
    position: absolute;
    top: 60px;
    left: 4.4em;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.1s;
}

/* class tambahan untuk mengubah posisi content saat area navbar dalam posisi melebar */
.swipe-wrapper-header {
    width: 80%;
    left: 20%;
    padding-right: 2em;
    transition: all 0.15s ease 0.15s;
}

/* wrapper-header section style */
.wrapper-header section {
    width: 100%;
    min-height: 500px;
    padding: 0 1.5em;
    padding-top: 5em;
    margin-top: 2em;
    border-radius: 10px;
    text-align: center;
    background-color: rgb(212, 154, 45);
    transition: all 0.3s;
}

.wrapper-header section h1 {
    margin-bottom: 1em;
}

.wrapper-header section h1::after {
    content: "";
    display: block;
    width: 5%;
    margin: auto;
    border-bottom: 2px solid rgb(26, 27, 27);
}

/* footer style */
footer {
    width: 100%;
    padding: 1em;
    margin-top: 27em;
    text-align: center;
}



.toggle-nav-item.is-expanded {
    width: 200px;
    height: 100%;
    padding: 0.6em;
    position: fixed;
    left: 0;
    z-index: 1;
    background-color: rgb(26, 27, 27);
    width: 200px;
    transition: width 0.3s ease-out;

}




  
</style>
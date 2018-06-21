<template>
    <div class="home-index">
        <el-container>
            <el-header class="home-index-header">
                <el-menu :default-active="activeIndex" class="home-index-header-menu" mode="horizontal">
                    <el-menu-item index="1">常州钓鱼网</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">入门</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3">技巧</el-menu-item>
                    <el-menu-item index="4">视频</el-menu-item>
                </el-menu>
                <section class="home-index-header-button">
                    <el-button type="primary" round @click="login">登录</el-button>
                    <el-button type="success" round @click="register">注册</el-button>
                </section>

            </el-header>
            <el-main>
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="item in 4" :key="item">
                    </el-carousel-item>
                </el-carousel>

                <el-row>
                    <el-col :span="6" v-for="item in 12" :key="item">
                        <el-card :body-style="{ padding: '0px' }" style="margin: 20px;">
                            <video-player  class="vjs-custom-skin"
                                           ref="videoPlayer"
                                           :options="playerOptions"
                                           :playsinline="true"
                                           @play="onPlayerPlay($event)"
                                           @pause="onPlayerPause($event)"
                                           @ended="onPlayerEnded($event)"
                                           @loadeddata="onPlayerLoadeddata($event)"
                                           @waiting="onPlayerWaiting($event)"
                                           @playing="onPlayerPlaying($event)"
                                           @timeupdate="onPlayerTimeupdate($event)"
                                           @canplay="onPlayerCanplay($event)"
                                           @canplaythrough="onPlayerCanplaythrough($event)"
                                           @ready="playerReadied"
                                           @statechanged="playerStateChanged($event)">
                            </video-player>
                            <div style="padding: 14px;">
                                <span>好吃的汉堡</span>
                                <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button type="text" class="button">操作按钮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

            </el-main>
            <el-footer>常州钓鱼网</el-footer>
        </el-container>
    </div>

</template>

<style>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-menu--horizontal>.el-menu-item.is-active {
        color: #ffffff;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .home-index-header, .home-index-header-menu {
        background-color: #409EFF;
        color: #ffffff !important;
    }

    .home-index-header {
        position: relative;
    }

    .home-index-header-menu {
        width: 340px;
        margin: 0 auto;
    }
    .home-index-header-button {
        position: absolute;
        top: 10px;
        right: 20px;
    }
    .home-index-header-button .el-button {
        border-color: #ffffff;
    }

    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>

<script>
    export default {
        data() {
            return {
                carouselLists: [
                    'http://p4.diaoyu123.com/group4/M00/BD/6D/CteWzlsGdBuAbjfqAAmJsXyH7Sw802.png',
                    'http://p6.diaoyu123.com/group6/M00/C6/92/CteWzVsiczWAKbNcAAWBWfJGAhQ839.png',
                    'http://p6.diaoyu123.com/group6/M00/C1/C2/CteWzVsaKqeAcpRWAApDNh90bds531.png',
                ],

                activeIndex: '1',
                currentDate: new Date(),
                // videojs options
                playerOptions: {
                    height: '360',
                    autoplay: false,
                    muted: true,
                    language: 'en',
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        // mp4
                        src: "http://vjs.zencdn.net/v/oceans.mp4",
                        // webm
                        // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                    }],
                    poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
                }

            }
        },
        mounted() {
            console.log('Component mounted.')
            this.get('/user/list', (response)=> {
                console.log(response)
            })
            // console.log('this is current player instance object', this.player)
            setTimeout(() => {
                console.log('dynamic change options', this.player)
                // change src
                // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
                // change item
                // this.$set(this.playerOptions.sources, 0, {
                //   type: "video/mp4",
                //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
                // })
                // change array
                // this.playerOptions.sources = [{
                //   type: "video/mp4",
                //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
                // }]
                this.player.muted(false)
            }, 5000)
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            // listen event
            onPlayerPlay(player) {
                // console.log('player play!', player)
            },
            onPlayerPause(player) {
                // console.log('player pause!', player)
            },
            onPlayerEnded(player) {
                // console.log('player ended!', player)
            },
            onPlayerLoadeddata(player) {
                // console.log('player Loadeddata!', player)
            },
            onPlayerWaiting(player) {
                // console.log('player Waiting!', player)
            },
            onPlayerPlaying(player) {
                // console.log('player Playing!', player)
            },
            onPlayerTimeupdate(player) {
                // console.log('player Timeupdate!', player.currentTime())
            },
            onPlayerCanplay(player) {
                // console.log('player Canplay!', player)
            },
            onPlayerCanplaythrough(player) {
                // console.log('player Canplaythrough!', player)
            },
            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },
            // player is ready
            playerReadied(player) {
                // seek to 10s
                console.log('example player 1 readied', player)
                player.currentTime(10)
                // console.log('example 01: the player is readied', player)
            },
            register() {
                this.$prompt('请输入邮箱', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            login() {
                this.$prompt('请输入邮箱', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        }
    }
</script>

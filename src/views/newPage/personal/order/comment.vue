<template>
    <div class="comment">
      <van-nav-bar
        title="发表评价"
        left-arrow
        @click-left="$router.go(-1)"
      />
<!--分数-->
      <div class="score">
        <div class="left">
          <div class="preview">
            <img src="../../../../assets/images/ceshi.jpg" alt="">
          </div>
        </div>
        <div class="right">
          <p>评分</p>
          <div class="star">
            <div
              style="display: inline-block"
              v-for="(item,index) in 5"
              :key="index"
              @click="clickStar(index)"
            >
              <van-icon
                name="star-o"
                class="star-active"
                v-if="index > currentIndex"
                size="1.08rem"
              />
              <van-icon
                v-else
                class="star-active"
                name="star"
                size="1.08rem"
              />
            </div>

          </div>
        </div>
      </div>

<!--      评价-->
      <div class="text">
          <div class="title">
            <p>
              评价
            </p>
          </div>
          <div class="textarea">
            <van-field
              v-model="message"
              rows="6"
              autosize
              type="textarea"
              maxlength="100"
              placeholder="请输入您的评价"
              show-word-limit
            />
          </div>
<!--        上传图片-->
          <div class="upload">
            <van-uploader multiple />
          </div>

<!--          上传-->
          <div class="button">
            发布
          </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "comment",
      data() {
          return {
            currentIndex:-1,
            message:''
          }
      },
      methods:{
        clickStar(index) {
          this.currentIndex = index
        }
      }
    }
</script>

<style scoped lang="less">
  .score {
    background-color: #fff;
    margin-top: 0.4rem;
    width: 100%;
    height: 3.2rem;
    display: flex;
    .left {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 3.2rem;
      height: 100%;
      .preview {
        width: 2.4rem;
        height: 2.4rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .right {
      padding-left: 0.4rem;
      width: calc(100% - 3.2rem);
      height: 100%;
      font-size: 14px;
      padding-top: 6px;
      .star {
        margin-top: 0.48rem;
        .star-active {
          color: #F6BC61;
        }
      }
    }
  }

  .text {
    width: 100%;
    height: 7rem;
    margin-top: 0.4rem;
    background-color: #fff;
    box-sizing: border-box;
    .title {
      box-sizing: border-box;
      padding: 0 0.56rem;
      height: 1rem;
      width: 100%;
      padding-top: 0.2rem;
      p {
        font-size: 0.56rem;
      }
    }
  }

  .upload {
    background-color: #fff;
    padding: 0.56rem;
    box-sizing: border-box;
  }

  .button {
    width: 13.8rem;
    height: 1.6rem;
    border-radius: 4px;
    background-color: #ED001A;
    text-align: center;
    line-height: 1.6rem;
    margin: 20px auto;
    font-size: 18px;
    color: #fff;
  }
</style>

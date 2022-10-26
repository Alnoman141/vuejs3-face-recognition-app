<template>
  <div class="textToSpeatch" />
</template>

<script>
export default {
  name: 'TextToSpeatch',
  props: {
    welcomeMsg: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      userInput: 'Hello, world',
      pitch: 1,
      rate: 1,
      synth: window.speechSynthesis,
      validation: false
    }
  },
  methods: {
    speak () {
      if (this.synth.speaking) {
        return
      }
      if (this.welcomeMsg !== '') {
        this.validation = false
        const sInstance = new SpeechSynthesisUtterance(this.welcomeMsg)
        sInstance.onend = function (event) {
          console.log('SpeechSynthesisUtterance.onend')
        }
        sInstance.onerror = function (event) {
          console.log('SpeechSynthesisUtterance.onerror')
        }
        const voices = this.synth.getVoices()
        sInstance.pitch = this.pitch
        sInstance.rate = this.rate
        sInstance.voice = voices[33]
        this.synth.speak(sInstance)
      } else {
        this.validation = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  width: 100%;
  display: block;
}
.row .left {
  width: 100%;
}

.row .right {
  width: 100%;
  font-size: 18px;
}

textarea {
  width: 65%;
  height: 150px;
  border-radius: 10px;
  border: 2px solid;
  padding: 10px;
  font-size: 15px;
}

.rate {
  width: 60%;
}

button {
  padding: 12px 74px;
  border-radius: 4px;
  background: #67d6be;
  font-size: 14px;
  cursor: pointer;
  margin-top: 30px;
}
.error-text {
  display: block;
  color: #8c0606;
  font-weight: 500;
}
</style>

<template lang="html">
	<textarea
		:value="value"
		@input='onChangeTextArea'
		v-bind:disabled="!editable"
		:placeholder="placeholder"
		class="rev-textarea" />
</template>

<script>
export default {
  props: [
    'value',
    'editable',
    'placeholder'
  ],
  data () {
    return {
      editing: false
    }
  },
  methods: {
    onChangeTextArea (evt) {
      this.$emit('input', evt.target.value)
    }
  }
}
</script>

<style lang="less">
	@import '../../../styleConfig.less';

	.rev-textarea {
		background: transparent;
		border: none;
		resize: none;
		display: inline-block;
		width: 100%;
		max-width: 60rem;
		flex: 1;

		&:active {
			outline: none;
		}

		&:not(:focus) {
			cursor: pointer;
		}
	}
</style>

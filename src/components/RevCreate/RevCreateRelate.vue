<template lang="html">
  <div class="rev-create_flow_step rev-create_flow_relate">

		<div class="rev-create_block">
			<div class="rev-create_block_title">
				Problem Description
			</div>
			<EditableTextArea
				v-model='problemDescription'
				:editable='true'
				:placeholder='"Is a clear concise description of the issue(s) that need(s) to be addressed by a problem solving team. A problem well stated is half solved."' />
		</div><!-- ./rev-create_block -->

		<div class="flex">
			<div class="rev-create_block">
				<div class="rev-create_block_title">
					What is the idea?
				</div>
				<EditableTextArea
					v-model='problemDescription'
					:editable='true'
					:placeholder='"Is a clear concise description of the issue(s) that need(s) to be addressed by a problem solving team. A problem well stated is half solved."' />
			</div><!-- ./rev-create_block -->

			<div class="rev-create_block">
				<div class="rev-create_block_title">
					What is the idea?
				</div>
				<EditableTextArea
					v-model='problemDescription'
					:editable='true'
					:placeholder='"Is a clear concise description of the issue(s) that need(s) to be addressed by a problem solving team. A problem well stated is half solved."' />
			</div><!-- ./rev-create_block -->
		</div>

  </div>
</template>

<script>
import EditableTextArea from '../UI/EditableTextArea/EditableTextArea.vue'
export default {
  components: {
    EditableTextArea: EditableTextArea
  },
  data () {
    return {
      problemDescription: 'default descriptio'
    }
  }
}
</script>

<style lang="less">
	@import '../../styleConfig.less';
</style>

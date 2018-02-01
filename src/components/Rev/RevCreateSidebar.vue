<template lang="html">
  <div class="rev-create_sidebar">
		<div class="rev-create_sidebar_steps">
			<div class="rev-create_sidebar_steps_element" v-for="(step, stepIndex) in steps" @click="onClickStep(stepIndex)" v-bind:class="{'-active': stepIndex === activeStepIndex}">
				<div class="rev-create_sidebar_steps_element_step" v-bind:class="{'-check': stepIndex < activeStepIndex}">
					{{stepIndex + 1}}
				</div>

				<div class="rev-create_sidebar_steps_element_step_label">
					{{step.label}}
				</div>
			</div>
		</div><!-- /.rev-create_sidebar_steps -->
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: [
    'activeStep',
    'steps'
  ],
  methods: {
    onClickStep (stepIndex) {
      this.$emit('onChange', this.steps[stepIndex], stepIndex)
    }
  },
  computed: {
    activeStepIndex () {
      return parseFloat(_.findKey(this.steps, {
        key: this.activeStep
      }))
    }
  }
}
</script>

<style lang="less">
	@import '../../styleConfig.less';

	.rev-create_sidebar {
		padding: 0;
		color: #fff;
		background: @sidebar-blue;
	}

	.rev-create_sidebar_steps {
		font-weight: 300;
		font-size: 2.25rem;
		margin-top: 1.5rem;
	}

	.rev-create_sidebar_steps_element {
		padding: 1.5rem 3rem;
		cursor: pointer;

		&:hover {
			background: rgba(0, 0, 0, 0.1);
		}

		&.-active {
			background: rgba(255, 255, 255, 0.1);
			.rev-create_sidebar_steps_element_step_label {
				font-weight: 700;
			}
		}
	}

	.rev-create_sidebar_steps_element_step_label {
		vertical-align: middle;
		display: inline-block;
		font-weight: 300;
	}

	.rev-create_sidebar_steps_element_step_label {
		display: inline-block;
		vertical-align: middle;
	}

	.rev-create_sidebar_steps_element_step {
		@step-size: 3rem;

		margin-right: 0.5rem;
		vertical-align: middle;
		display: inline-block;
		font-size: 1.8rem;
		border: 2px solid #fff;
		border-radius: @step-size;
		height: @step-size;
		line-height: @step-size * 0.8;
		width: @step-size;
		text-align: center;

		&.-check {
			background: @pale-green;
			border-color: @pale-green;
			color: transparent;

			&::after {
				content: '';
				display: block;
				position: absolute;
				top: @step-size;
				left: @step-size / 2;
				height: 5rem;
				border-left: 1px solid #fff;
			}

			&::before {
				content: '✓';
				display: block;
				text-align: center;
				color: #fff;
			}
		}
	}
</style>

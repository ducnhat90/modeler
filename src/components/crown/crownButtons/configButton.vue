<template>
  <crown-button
    :title="$t('Config Element')"
    v-b-tooltip.hover.viewport.d50="{ customClass: 'no-pointer-events' }"
    aria-label="Config Element"
    data-test="config-button"
    role="menuitem"
    :src="cogIcon"
    @click="configNode"
  />
</template>

<script>
import CrownButton from '@/components/crown/crownButtons/crownButton';
import cogIcon from '@/assets/cog-icon.svg';

export default {
  components: { CrownButton },
  props: ['node'],
  data() {
    return {
      cogIcon,
    };
  },
  methods: {
    configNode() {
      this.$emit('show-config-modal', this.node);
    },
  },
};
</script>

<template>
  <crown-config
    :highlighted="highlighted"
    :paper="paper"
    :graph="graph"
    :shape="shape"
    :node="node"
    :nodeRegistry="nodeRegistry"
    :moddle="moddle"
    :collaboration="collaboration"
    :process-node="processNode"
    :plane-elements="planeElements"
    :is-rendering="isRendering"
    v-on="$listeners"
  />
</template>
<script>
import TaskComponent from '@/components/nodes/task/task';
import mailIcon from '!!svg-inline-loader!@/assets/toolpanel/mail.svg';
import updateIconColor from '@/mixins/updateIconColor';

export default {
  extends: TaskComponent,
  mixins: [updateIconColor],
  data() {
    return {
      nodeIcon: mailIcon,
    };
  },
};
</script>

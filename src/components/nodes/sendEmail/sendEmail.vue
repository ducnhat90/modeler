<template>
  <div>
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
      :showConfigIcon="true"
      @show-config-modal="showModal"
      v-on="$listeners"
    />
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      :title="$t('Config')"
      :ok-title="$t('Save')"
      :cancel-title="$t('Cancel')"
      v-model="showConfigModal"
      @hidden="showConfigModal = false"
      @ok="confirm"
    >
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="3" class="align-middle">
            <label>To:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="receiver" placeholder="Receiver's Email"/>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3" class="align-middle">
            <label>Cc:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="cc" placeholder="Receiver's Email"/>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3" class="align-middle">
            <label>Bcc:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="bcc" placeholder="Receiver's Email"/>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3" class="align-middle">
            <label>Subject:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="subject" placeholder="Email Subject"/>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3" class="align-middle">
            <label>Content:</label>
          </b-col>
          <b-col sm="9">
            <b-form-textarea v-model="body" rows="5" placeholder="Email Content"/>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>
<script>
import TaskComponent from '@/components/nodes/task/task';
import mailIcon from '!!svg-inline-loader!@/assets/toolpanel/mail.svg';
import updateIconColor from '@/mixins/updateIconColor';
// import defaultNames from '@/components/nodes/task/defaultNames';

export default {
  extends: TaskComponent,
  mixins: [updateIconColor],
  props: {
    node: Object,
  },
  data() {
    let node = this.node;
    let config = JSON.parse(node.definition.config);

    return {
      nodeIcon: mailIcon,
      showConfigModal: true,
      receiver: config.receiver ?? '',
      cc: config.cc ?? '',
      bcc: config.bcc ?? '',
      subject: config.subject ?? '',
      body: config.body ?? '',
    };
  },
  methods: {
    confirm() {
      let node = this.node;
      let config = JSON.parse(node.definition.config);
      config.receiver = this.receiver;
      config.cc = this.cc;
      config.bcc = this.bcc;
      config.subject = this.subject;
      config.body = this.body;
      node.definition.config = JSON.stringify(config);
      this.$emit('replace-node', node);
    },
    showModal() {
      this.showConfigModal = true;
    },
  },
};
</script>

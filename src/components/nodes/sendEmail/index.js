import idConfigSettings from '@/components/inspectors/idConfigSettings';
import component from './sendEmail';

window.ProcessMaker.EventBus.$on('modeler-init', ({registerNode}) => {
  /* Add a custom node example */

  const implementation = 'antnest-mailgun';
  const nodeId = 'antnest-mailgun';

  const nodeType = {
    id: nodeId,
    component,
    bpmnType: 'bpmn:ServiceTask',
    control: true,
    category: 'Other',
    icon: require('@/assets/toolpanel/mail.svg'),
    label: 'Send Mail',
    // implementation,
    definition(moddle) {
      return moddle.create('bpmn:ServiceTask', {
        name: 'Send Mail',
        implementation,
        config: JSON.stringify({receiver: '', cc: '', bcc: '', subject: '', body: ''}),
      });
    },
    diagram(moddle) {
      return moddle.create('bpmndi:BPMNShape', {
        bounds: moddle.create('dc:Bounds', {
          height: 76,
          width: 116,
        }),
      });
    },
    confirm(msg = '') {
      alert(msg);
    },
    /* Map values from inspector data to node definition  */
    inspectorHandler(value, node, setNodeProp) {
      // Go through each property and rebind it to our data
      const definition = node.definition;
      const config = JSON.parse(definition.config);

      for (const key in value) {
        if (key in config) {
          config[key] = value[key];
        } else if (definition[key] !== value[key]) {
          setNodeProp(node, key, value[key]);
        }
      }

      const newConfig = JSON.stringify(config);
      if (newConfig !== definition.config) {
        setNodeProp(node, 'config', newConfig);
      }
    },
    /* Map values from node definition to inspector data */
    inspectorData(node) {
      return Object.entries(node.definition).reduce((data, [key, value]) => {
        if (key === 'config') {
          try {
            const config = JSON.parse(value);
            return {...data, ...config};
          } catch (error) {
            /* Ignore invalid JSON */
          }
        }

        data[key] = value;
        return data;
      }, {});
    },
    inspectorConfig: [
      {
        name: 'Send Mail',
        items: [
          {
            component: 'FormAccordion',
            container: true,
            config: {
              initiallyOpen: true,
              label: 'Configuration',
              icon: 'cog',
              name: 'inspector-accordion',
            },
            items: [
              {
                component: 'FormText',
                config: {
                  label: 'Send Mail',
                  fontSize: '2em',
                },
              },
              {
                component: 'FormInput',
                config: {
                  label: 'To',
                  helper: 'Receiver\'s email',
                  name: 'receiver',
                },
              },
              {
                component: 'FormInput',
                config: {
                  label: 'CC',
                  helper: 'Receiver\'s email',
                  name: 'cc',
                },
              },
              {
                component: 'FormInput',
                config: {
                  label: 'BCC',
                  helper: 'Receiver\'s email',
                  name: 'bcc',
                },
              },
              {
                component: 'FormInput',
                config: {
                  label: 'Subject',
                  helper: 'Mail Subject',
                  name: 'subject',
                },
              },
              {
                component: 'FormTextArea',
                config: {
                  label: 'Body',
                  helper: 'Mail Content',
                  name: 'body',
                },
              },
              {
                component: 'FormInput',
                config: idConfigSettings,
              },
            ],
          },
        ],
      },
    ],
  };

  registerNode(nodeType, definition => {
    if (definition.get('implementation') === implementation) {
      return nodeId;
    }
  });
});

import React, { Component, PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { FieldGroup } from '/client/modules/core/components/ui';

class EmailSettings extends Component {

  static propTypes = {
    providers: PropTypes.arrayOf(PropTypes.string).isRequired,
    saveSettings: PropTypes.func.isRequired,
    settings: PropTypes.shape({
      service: PropTypes.string,
      host: PropTypes.string,
      port: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      user: PropTypes.string,
      pass: PropTypes.string
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      settings: props.settings,
      isSaving: false
    };

    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStateChange(e) {
    const { settings } = this.state;
    settings[e.target.name] = e.target.value;
    this.setState({ settings });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { saveSettings } = this.props;
    const { settings } = this.state;
    this.setState({ isSaving: true });
    saveSettings(settings, () => this.setState({ isSaving: false }));
  }

  render() {
    const { providers } = this.props;
    const { settings, isSaving } = this.state;

    return (
      <Panel header={<h3 className='text-center'>Mail Provider</h3>}>
        <p className='text-center'>(Used for sending application emails)</p>
        <form onSubmit={this.handleSubmit}>
          <FieldGroup
            label='Service'
            componentClass='select'
            name='service'
            value={settings.service}
            onChange={this.handleStateChange}>
            <option value=''>Select a Service...</option>
            <option value='custom'>Custom</option>
            {providers.map((name, i) => (
              <option key={i} value={name}>{name}</option>
            ))}
          </FieldGroup>
          <hr/>
          {settings.service === 'custom' &&
            <div>
              <FieldGroup
                label='Host'
                type='text'
                name='host'
                defaultValue={settings.host}
                onChange={this.handleStateChange}/>
              <FieldGroup
                label='Port'
                type='text'
                name='port'
                defaultValue={settings.port}
                onChange={this.handleStateChange}/>
            </div>}
          <FieldGroup
            label='User'
            type='text'
            name='user'
            defaultValue={settings.user}
            onChange={this.handleStateChange}/>
          <FieldGroup
            label='Password'
            type='password'
            name='pass'
            defaultValue={settings.pass}
            onChange={this.handleStateChange}/>
          <Button bsStyle='primary' className='pull-right' type='submit' disabled={isSaving}>
            {isSaving ? <i className='fa fa-refresh fa-spin'/> : 'Save'}
          </Button>
        </form>
      </Panel>
    );
  }
}

export default EmailSettings;

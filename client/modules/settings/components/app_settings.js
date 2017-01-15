import React, { Component, PropTypes } from 'react';
import { Row, Panel, Button } from 'react-bootstrap';
import _ from 'lodash';
import { FieldGroup } from '/client/modules/core/components/ui';


class AppSettings extends Component {

  static propTypes = {
    settings: PropTypes.object,
    update: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    userIsInRole: PropTypes.func.isRequired
  }

  constructor(props = {}) {
    super(props);
    this.state = props.settings;
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStateChange(e) {
    this.setState(_.set(this.state, e.target.name, e.target.value));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { update } = this.props;
    update(this.state);
  }

  heading(title, roles = 'admin') {
    return this.props.userIsInRole(this.props.user, roles) && (
      <Row className='settings-group-heading'>
        <h4>{title}</h4>
      </Row>
    );
  }

  field(label, setting, roles = 'admin') {
    return this.props.userIsInRole(this.props.user, roles) && (
      <FieldGroup
        label={label}
        type='text'
        name={setting}
        defaultValue={_.get(this.state, setting)}
        onChange={this.handleStateChange}/>
    );
  }

  render() {
    return (
      <Panel header={<h3 className='text-center'>App Settings</h3>} className='settings-page-form'>
        <form onSubmit={this.handleSubmit}>

          {this.heading('General')}
          {this.field('App Title', 'app.title')}
          {this.field('Admin Email', 'app.adminEmail')}

          {this.heading('Smart Things')}
          {this.field('Client ID', 'smartthings.clientId')}
          {this.field('Client Secret', 'smartthings.clientSecret')}

          {this.heading('Kadira', 'superuser')}
          {this.field('App ID', 'kadira.appId', 'superuser')}
          {this.field('Secret', 'kadira.appSecret', 'superuser')}

          {this.heading('Segment.io', 'superuser')}
          {this.field('API Key', 'segment.writeKey', 'superuser')}

          {this.heading('Slack')}
          {this.field('Webhook URL', 'slack.webhookUrl')}

          <Row>
            <div className='form-group'>
              <Button type='submit' bsStyle='primary' className='pull-right'>Save</Button>
            </div>
          </Row>

        </form>
      </Panel>
    );
  }
}

export default AppSettings;

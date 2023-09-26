import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class StepperSignupComponent extends Component {
  @service login;
  @service router;
  @tracked currentStep =
    Number(localStorage.getItem('currentStep')) ?? Number(this.args.step) ?? 0;
  constructor() {
    super(...arguments);

    this.currentStep = Number(
      new URLSearchParams(window.location.search).get('step')
    );
  }

  @action incrementStep() {
    if (this.currentStep < 5) {
      this.currentStep += 1;
      const queryParams = { dev: true, step: this.currentStep };
      this.router.transitionTo('join', { queryParams });
    }
  }

  @action letsGoHandler() {
    if (this.login.isLoggedIn && !this.login.isLoading) {
      this.incrementStep();
    }
  }
}
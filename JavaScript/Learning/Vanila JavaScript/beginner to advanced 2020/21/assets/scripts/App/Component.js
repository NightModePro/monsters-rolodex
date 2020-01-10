export function doSomething() { };

export default class {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element);
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      // eslint-disable-next-line multiline-ternary
      // eslint-disable-next-line no-ternary
      this.insertBefore ? 'afterbegin' : 'beforeend',

      this.element
    );
  }
}
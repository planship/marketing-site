<script>
  import { onMount } from 'svelte';

  const states = {
    IDLE: 1,
    LOADING: 2,
    SUCCESS: 3,
    FAIL: 4,
  };
  let interestForm;
  let emailInput;
  let state = states.IDLE;

  $: isIdle = state === states.IDLE;
  $: isLoading = state === states.LOADING;
  $: isSuccess = state === states.SUCCESS;
  $: isFail = state === states.FAIL;

  onMount(() => {
    emailInput.focus();
  });

  const reset = () => {
    state = states.IDLE;
  }

  const onSubmit = (e) => {
    let formData = new FormData(interestForm);
    state = states.LOADING;

    return fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
    .then((res) => {
      if (res && res.status === 200){
        state = states.SUCCESS;
      } else {
        state = states.FAIL;
        setTimeout(reset, 3000);
      }
    })
    .catch((error) => {
      state = states.FAIL;
      setTimeout(reset, 3000);
    });
  };
</script>

<div class="hero min-h-screen bg-transparent">
  <div class="hero-content flex flex-col lg:flex-row-reverse lg:space-x-10 lg:space-x-reverse">
    <div class="text-center lg:text-left max-lg:mx-auto">
      <img class="w-1/4 md:w-1/5 max-lg:mx-auto" src="$lib/images/planship-logo.svg" alt="Planship logo consisting of a cargo ship hoisting a shipping container" />
      <h1 class="lg:mt-2 text-primary text-5xl font-bold">Planship</h1>
      <p class="text-xl py-2 font-semibold text-neutral-600">SaaS plan and subscription <code>code</code> made easy.</p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-primary text-primary-content my-8 md:my-0">
      <div class="card-body">
        <h2 class="text-2xl font-bold text-left">Sign up for early access!</h2>
        <p>
          Iterate on plans, features, and other levers with ease by separating pricing logic from product code.
        </p>
        <form
          class="form-control mt-6"
          class:hidden="{!isLoading && !isIdle}"
          bind:this={interestForm}
          name="interest-list"
          on:submit|preventDefault={onSubmit}
          netlify
          netlify-honeypot="pooh-field"
        >
          <input type="hidden" name="form-name" value="interest-list" />
          <p class="hidden">
            <label>
              Gotcha:
              <input type="text" name="pooh-field" />
            </label>
          </p>
          <div class="input-group">
            <input
              bind:this="{emailInput}"
              class="input input-bordered text-neutral flex grow min-w-0"
              type="email"
              name="email"
              aria-label="Your work email"
              placeholder="Your work email"
              required
              disabled="{isLoading}"
            />
            <button
              class="btn btn-success min-w-0"
              type="submit"
              class:loading="{isLoading}"
            >
              <span
                class="px-0"
                class:hidden={!isIdle}
              >
                Add me!
              </span>
            </button>
          </div>
        </form>
        <div
          class:hidden="{!isSuccess}"
          class="alert alert-success shadow-lg"
        >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Great! You'll hear from us soon. 🎉</span>
          </div>
        </div>
        <div
          class:hidden="{!isFail}"
          class="alert alert-error shadow-lg"
        >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Uh oh! Something went wrong. Please try again. 😞</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

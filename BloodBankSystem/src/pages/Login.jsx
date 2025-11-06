
<div class="min-h-screen bg-[#FBF8F8] flex items-center justify-center px-4">
  <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
    <div class="flex flex-col items-center">
      <div class="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
        <img src="/logo-96.png" alt="LifeLine" class="w-12 h-12"/>
      </div>
      <h1 class="text-3xl font-bold text-[#0F172A] mb-1">Welcome to LifeLine</h1>
      <p class="text-sm text-gray-500 mb-6">Sign in to continue to the clinic dashboard</p>

      <button class="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-3 mb-4 hover:bg-gray-50">
        <img src="https://www.gstatic.com/devrel-devsite/prod/v.../logo.png" alt="Google" class="w-5 h-5"/>
        Continue with Google
      </button>

      <div class="w-full flex items-center mb-4 text-sm text-gray-400">
        <hr class="flex-grow mr-3"/>
        OR
        <hr class="flex-grow ml-3"/>
      </div>

      <form class="w-full space-y-4">
        <div>
          <label class="text-sm text-gray-600 mb-1 block">Email</label>
          <input type="email" placeholder="you@clinic.com" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-rose-200"/>
        </div>

        <div>
          <label class="text-sm text-gray-600 mb-1 block">Password</label>
          <input type="password" placeholder="••••••••" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-rose-200"/>
        </div>

        <button type="submit" class="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg font-semibold">Sign in</button>

        <div class="flex justify-between text-sm text-gray-500">
          <a href="#" class="hover:underline">Forgot password?</a>
          <a href="/register" class="text-rose-600 hover:underline">Need an account? Sign up</a>
        </div>
      </form>
    </div>
  </div>
</div>

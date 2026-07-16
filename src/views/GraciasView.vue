<template>
  

  <main class="gracias-page">
    <div class="content-wrapper">
      <!-- Icono de éxito estilizado -->
      <div class="icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="success-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>

      <h1 class="title">¡Solicitud Recibida!</h1>
      <p class="subtitle">
        Hemos recibido los datos de tu empresa correctamente. En breve, un ejecutivo se pondrá en contacto contigo para brindarte toda la información.
      </p>

      
      <div class="actions">
        <router-link to="/" class="btn-primary">
          Regresar al inicio
        </router-link>
      </div>
    </div>
  </main>
 
</template>

<script setup>


</script>

<style scoped>
.gracias-page {
  display: flex;
  align-items: center;     
  justify-content: center;  
  min-height: 100vh;         
  padding: 4rem 1rem;        
  background-color: #fafafa; 
  font-family: inherit;
  box-sizing: border-box;
}

.content-wrapper {
  max-width: 550px;
  width: 100%;
  text-align: center;
  background: #ffffff;
  padding: 3.5rem 2.5rem;   
  border-radius: 16px;       
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04); 
  border: 1px solid #f0f0f0; 
}

.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: #e6f7ed;
  border-radius: 50%;
  margin-bottom: 1.5rem;
}

.success-icon {
  width: 48px;
  height: 48px;
  color: #24b47e;
}

.title {
  color: #1a1a1a;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.subtitle {
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  justify-content: center;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #0056b3; 
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 86, 179, 0.15);
}

.btn-primary:hover {
  background-color: #004085;
  transform: translateY(-1px);
}
</style>
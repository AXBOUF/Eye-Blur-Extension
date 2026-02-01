document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleBtn');
  const status = document.getElementById('status');
  
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getStatus' }, function(response) {
      if (chrome.runtime.lastError) {
        updateUI(false);
      } else {
        updateUI(response ? response.enabled : true);
      }
    });
  });
  
  toggleBtn.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggle' }, function(response) {
        if (response) {
          updateUI(response.enabled);
        }
      });
    });
  });
  
  function updateUI(enabled) {
    if (enabled) {
      toggleBtn.textContent = 'Disable';
      toggleBtn.classList.remove('disabled');
      status.textContent = 'Extension is active';
    } else {
      toggleBtn.textContent = 'Enable';
      toggleBtn.classList.add('disabled');
      status.textContent = 'Extension is disabled';
    }
  }
});
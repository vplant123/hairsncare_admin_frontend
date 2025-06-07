{order.deliveryStatus 
  ? order.deliveryStatus.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ') 
  : "Unknown"} 
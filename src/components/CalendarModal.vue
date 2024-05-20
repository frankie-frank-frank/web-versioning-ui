<template>
    <div class="date-range-picker">
      <div class="header">
          <input
          type="text"
          v-model="dateRange"
          @focus="toggleDatePicker"
          @input="handleDateInput"
          />
          <button @click="clearDates">×</button>
        <button @click="prevMonth">‹</button>
        <button @click="nextMonth">›</button>
        <button @click="selectToday">Today</button>
      </div>
      <div>
        
      </div>
      <div v-if="showDatePicker" class="datepicker-container">
        <div class="calendar-wrapper">
          <div class="calendar" ref="startCalendar">
            <div class="month">
              <span>{{ startMonth }} {{ startYear }}</span>
            </div>
            <div class="days">
              <div class="day" v-for="(day, index) in daysInMonth(startYear, startMonthIndex)" :key="index" :class="{ selected: isSelected(day, startMonthIndex), highlighted: isHighlighted(day, startMonthIndex) }" @click="selectDate(day, startMonthIndex)">
                {{ day }}
              </div>
            </div>
          </div>
          <div class="calendar" ref="endCalendar">
            <div class="month">
              <span>{{ endMonth }} {{ endYear }}</span>
            </div>
            <div class="days">
              <div class="day" v-for="(day, index) in daysInMonth(endYear, endMonthIndex)" :key="index" :class="{ selected: isSelected(day, endMonthIndex), highlighted: isHighlighted(day, endMonthIndex) }" @click="selectDate(day, endMonthIndex)">
                {{ day }}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  
  export default {
    setup() {
      const startDate = ref(null);
      const endDate = ref(null);
      const showDatePicker = ref(false);
      const dateRange = ref('');
      const today = new Date();
  
      const startMonthIndex = ref(today.getMonth());
      const startYear = ref(today.getFullYear());
      const endMonthIndex = ref(today.getMonth() + 1);
      const endYear = ref(today.getFullYear());
  
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
      const startMonth = computed(() => monthNames[startMonthIndex.value]);
      const endMonth = computed(() => monthNames[endMonthIndex.value % 12]);
  
      onMounted(() => {
        if (endMonthIndex.value > 11) {
          endMonthIndex.value -= 12;
          endYear.value += 1;
        }
        // Set default date range of 7 days
        const start = new Date(today);
        const end = new Date(today);
        end.setDate(end.getDate() + 7);
        startDate.value = start;
        endDate.value = end;
        dateRange.value = `${formatDate(start)} - ${formatDate(end)}`;
      });
  
      const daysInMonth = (year, monthIndex) => {
        return new Array(new Date(year, monthIndex + 1, 0).getDate()).fill(null).map((_, index) => index + 1);
      };
  
      const toggleDatePicker = () => {
        showDatePicker.value = !showDatePicker.value;
      };
  
      const clearDates = () => {
        startDate.value = null;
        endDate.value = null;
        dateRange.value = '';
        showDatePicker.value = false;
      };
  
      const isSelected = (day, monthIndex) => {
        const selectedDate = new Date(startYear.value, monthIndex, day);
        return (startDate.value && selectedDate.getTime() === startDate.value.getTime()) || (endDate.value && selectedDate.getTime() === endDate.value.getTime());
      };
  
      const isHighlighted = (day, monthIndex) => {
        if (!startDate.value || !endDate.value) return false;
        const currentDate = new Date(startYear.value, monthIndex, day);
        return currentDate >= startDate.value && currentDate <= endDate.value;
      };
  
      const selectDate = (day, monthIndex) => {
        const selectedDate = new Date(startYear.value, monthIndex, day);
        if (!startDate.value || (startDate.value && endDate.value)) {
          startDate.value = selectedDate;
          endDate.value = null;
        } else {
          endDate.value = selectedDate > startDate.value ? selectedDate : startDate.value;
          startDate.value = selectedDate > startDate.value ? startDate.value : selectedDate;
        }
        dateRange.value = `${formatDate(startDate.value)} - ${endDate.value ? formatDate(endDate.value) : ''}`;
      };
  
      const formatDate = (date) => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      };
  
      const prevMonth = () => {
        if (startMonthIndex.value === 0) {
          startMonthIndex.value = 11;
          startYear.value -= 1;
        } else {
          startMonthIndex.value -= 1;
        }
        if (endMonthIndex.value === 0) {
          endMonthIndex.value = 11;
          endYear.value -= 1;
        } else {
          endMonthIndex.value -= 1;
        }
      };
  
      const nextMonth = () => {
        if (startMonthIndex.value === 11) {
          startMonthIndex.value = 0;
          startYear.value += 1;
        } else {
          startMonthIndex.value += 1;
        }
        if (endMonthIndex.value === 11) {
          endMonthIndex.value = 0;
          endYear.value += 1;
        } else {
          endMonthIndex.value += 1;
        }
      };
  
      const selectToday = () => {
        const today = new Date();
        const start = new Date(today);
        const end = new Date(today);
        end.setDate(end.getDate() + 7);
        startDate.value = start;
        endDate.value = end;
        dateRange.value = `${formatDate(start)} - ${formatDate(end)}`;
      };
  
      const handleDateInput = (event) => {
        const dates = event.target.value.split(' - ');
        if (dates.length === 2) {
          const start = new Date(dates[0]);
          const end = new Date(dates[1]);
          if (!isNaN(start) && !isNaN(end)) {
            startDate.value = start;
            endDate.value = end;
          }
        }
      };
  
      return {
        startDate,
        endDate,
        showDatePicker,
        dateRange,
        startMonthIndex,
        startYear,
        endMonthIndex,
        endYear,
        startMonth,
        endMonth,
        daysInMonth,
        toggleDatePicker,
        clearDates,
        isSelected,
        isHighlighted,
        selectDate,
        prevMonth,
        nextMonth,
        selectToday,
        handleDateInput,
      };
    },
  };
  </script>
  
  <style>
  .date-range-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 450px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    background-color: #fff;
  }
  
  .header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
  }
  
  .header input {
    width: 50%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .header button {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 5px;
    font-size: 1.5em;
  }
  
  .datepicker-container {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .calendar-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .calendar {
    width: 50%;
    padding: 10px;
    /* border: 1px solid #ddd; */
    border-radius: 4px;
  }
  
  .month {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  
  .day {
    text-align: center;
    padding: 5px;
    /* margin: 2px; */
    cursor: pointer;
  }
  
  .day.selected {
    background-color: green;
    color: red;
    /* border-radius: 50%; */
  }
  
  .day.highlighted {
    background-color: #cce5ff;
    /* border-radius: 50%; */
  }
  </style>
  
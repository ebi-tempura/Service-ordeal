import random
import time

from Functions import package_select

print ("-"*50)
debt = 1500
print (f"Debt =", debt)

shift = input ("Enter the shift you are going to work:")
print (f"The shift chosen is of {shift} hour(s)" )

print ("-"*50)

shift_1 = [1, 60, 120]
shift_2 = [2, 120, 320]
shift_3 = [3, 180, 520]

if shift == "1":
    print (f"Shift 1: {shift_1[0]} hour(s) | {shift_1[1]} minute(s) | {shift_1[2]} daily fee")
elif shift == "2":
    print (f"Shift 2: {shift_2[0]} hour(s) | {shift_2[1]} minute(s) | {shift_2[2]} daily fee")
elif shift == "3":
    print (f"Shift 3: {shift_3[0]} hour(s) | {shift_3[1]} minute(s) | {shift_3[2]} daily fee")
else:
    print ("Invalid shift selection. Please choose 1, 2, or 3.")
    exit()

day = 0
time_spent = 0
earnings = 0

while earnings < debt:

    while  time_spent < shift_1[1]:

        day += 1

        selected_package, selected_service, time_spent = package_select()

        earnings = earnings + selected_service 

        print ("-"*50)
        print (f"Day {day}")
        print ("-"*50)
        print (f"Selected package: {selected_package }")
        print (f"Selected service: {selected_service}")
        print (f"Earnings: {earnings}") 
        print (f"Time spent: {time_spent} minute(s)")



    print ("-"*50)
   
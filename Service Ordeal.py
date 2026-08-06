
from Functions import package_select, punishment, rest_period, pay_half

print ("-"*50)
debt = 1500
print (f"Debt =", debt)

shift = input ("Enter the shift you are going to work: ")
print (f"The shift chosen is of {shift} hour(s)" )

shift_1 = [1, 60, 120, 90]
shift_2 = [2, 120, 320, 240]
shift_3 = [3, 180, 520, 390]

if shift == "1":
    selected_shift = shift_1
elif shift == "2":
    selected_shift = shift_2
elif shift == "3":
    selected_shift = shift_3
else:
    print("Invalid shift selection. Please choose 1, 2, or 3.")
    exit()
shift_time = selected_shift[1]
daily_fee = selected_shift[len(selected_shift) // 2]
extra_time = selected_shift[-1]


print (f"Shift time: {shift_time} minutes")
print (f"Daily fee: {daily_fee} dollars")
print (f"Extra fee: {extra_time} dollars")

print ("-"*50)

day = 0
time_spent = 0
time_shift = 0
earnings = 0
Total_earnings = 0
current_earnings = 0


while Total_earnings < debt:
        
        day += 1
        Total_time = 0
        daily_earnings = 0
        masterlist = []

        print ("-"*50)
        print (f"Day {day}")

        while Total_time < shift_time:

            selected_package, selected_service, time_spent = package_select()
            rest_time = rest_period()
            time_spent += rest_time
            Total_time += time_spent
            daily_earnings += selected_service

            masterlist.append(f"Selected package: {selected_package} | Selected service: {selected_service} | Time spent: {time_spent} minutes | Time rest: {rest_time} minutes | Total time: {Total_time} minutes | Earnings: {selected_service}")

        print ("")
        print (*masterlist, sep="  \n")
        print ("")

        print (f"Earnings for the day: {daily_earnings}") 
        print ("")

        current_earnings_1= punishment(current_earnings, selected_shift)

        earnings = daily_earnings - daily_fee
        Total_earnings = Total_earnings + earnings + current_earnings_1
        Total_punishment = earnings + current_earnings_1   

        print ("")
        print (f"Daily earning after punishment",daily_earnings)

        print (f"Daily fee: {daily_fee}")
        print (f"Total earnings after daily fee: {earnings}")
        print (f"Current earnings of punishment and earning after fee: {Total_punishment}")
        print (f"Total earnings: {Total_earnings}")
        print ("")








  
   
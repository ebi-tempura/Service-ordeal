
import random

def package_select():

    packages = ["package_A", "package_B", "package_C"]

    cost_A = [40,60,60,80]
    cost_B = [40,60,80,60,60]
    cost_C = [80]

    selected_package = random.choice(packages)

    if selected_package == "package_A":

        selected_service = random.choice(cost_A)

        time_spent = 10
    
    elif selected_package == "package_B":

        selected_service = random.choice(cost_B)

        time_spent = 15

    elif selected_package == "package_C":
        selected_service =random.choice(cost_C)

        time_spent = 20
    
    return selected_package, selected_service, time_spent

def rest_period():

    randnom_rest_time = random.randint(1, 9)

    if randnom_rest_time >= 5:   
        rest_time = 5 
        #print (f"Rest period: {rest_time}")

    else:
        rest_time = 0

        #print ("No rest period")

    return rest_time

def pay_half(pay_multiplier):
    random_half_pay = random.randint(0, 9)

    if random_half_pay < 2:
        pay_multiplier = 0.5

    else:
        pay_multiplier = 1

    return pay_multiplier

def punishment_selector(daily_earnings, selected_shift, pay_multiplier, shift_time,Total_time):
    random_punishment = random.randint(0, 9)
    daily_earnings_after_punishment = daily_earnings
    extra_earnings = 0
    print ("")
    print (f"Daily earnings before punishment: {daily_earnings}")  

    if random_punishment == 7:

        print ("")
        print("You have to work in a bad part of town; half your earnings will be stolen.")
        daily_earnings *= 0.5
        daily_earnings_after_punishment = daily_earnings
        print (f"Daily earnings after punishment, half: {daily_earnings_after_punishment}")

    elif random_punishment == 8:

        print ("")
        print("You have been robbed.")
        daily_earnings = 0
        daily_earnings_after_punishment = daily_earnings
        print (f"Daily earnings after punishment, robbed: {daily_earnings_after_punishment}")

    elif random_punishment == 0:

        print ("")
        print("You have to work an extra shift.")
        print ("")

        masterlist_extra = []
        extra_earnings = 0
        time_spent_wrest = 0
        Total_time = 0


        while Total_time < shift_time:

            X = ""

            selected_package, selected_service, time_spent = package_select()
            pay_multiplier = pay_half(pay_multiplier)
            rest_time = rest_period()
            time_spent_wrest = time_spent
            time_spent_wrest+= rest_time
            Total_time += time_spent_wrest

            if Total_time + time_spent == shift_time + 5:

                 break

            selected_service = selected_service * pay_multiplier
            extra_earnings += selected_service

            if pay_multiplier == 0.5:
        
                X = "*"

            masterlist_extra.append(f"Selected package: {selected_package} |" 
                                   f"Selected service: {selected_service} |"
                                   f"{X}|" 
                                   f"Earnings: {extra_earnings} |"
                                   f" Time spent: {time_spent} minutes |" 
                                   f" Time rest: {rest_time} minutes |"
                                   f" Total time: {Total_time} minutes ")
        
        extra_fee = selected_shift[-1]
        print(*masterlist_extra, sep="\n")

        print("")
        print(f"Extra-shift earnings: {extra_earnings}")
        print(f"Extra-shift fee: {extra_fee}")

        daily_earnings_after_punishment += extra_earnings - extra_fee

        print(f"Extra-shift earnings after fee: {daily_earnings_after_punishment}")

    else:
        print("No monetary punishment.")

    return daily_earnings_after_punishment, pay_multiplier

def punishment(selected_shift, pay_multiplier, daily_earnings, shift_time, Total_time): #
    random_punishment = random.randint(0, 9)

    if random_punishment < 6 :
        print("You have been punished twice today.")
        daily_earnings, pay_multiplier = punishment_selector(daily_earnings,selected_shift,pay_multiplier,shift_time,Total_time)  
        daily_earnings, pay_multiplier = punishment_selector(daily_earnings,selected_shift,pay_multiplier,shift_time,Total_time)  

        
    elif random_punishment >= 6:
        print("You have been punished once today.")
        daily_earnings, pay_multiplier = punishment_selector(daily_earnings,selected_shift,pay_multiplier,shift_time,Total_time)  


    else:

        print ("")
        print("No punishment today.")

    return daily_earnings,pay_multiplier

def punishment_belowZero(selected_shift, pay_multiplier, daily_earnings, shift_time, Total_time):
    
    print ("")
    print("You have been punished because you didnt earn enough to pay you daily fee!.")
    print ("")

    return daily_earnings,pay_multiplier
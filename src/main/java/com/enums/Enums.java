package com.enums;

import com.utils.CustomException;

public class Enums {
	public static enum CarType {
		Sedan(1), Suv(2), Hatchback(3);

		private final int value;

		CarType(int value) {
			this.value = value;
		}

		public int getValue() {
			return value;
		}

		public static String getNameByValue(int value) throws CustomException {
			for (CarType carType : CarType.values()) {
				if (carType.getValue() == value) {
					return carType.name();
				}
			}
			throw new CustomException(404,"Unknown car type for value: " + value);
		}

		public static int getValueByName(String name) throws CustomException {
			try {
				CarType carType = CarType.valueOf(name);
				return carType.getValue();
			} catch (IllegalArgumentException e) {
				throw new CustomException(400,"Invalid car type name: " + name);
			}
		}

	}
	
	public static enum CompanyStatus{
		User(0),
		Admin(1),
		SuperAdmin(2);

	    private final int code; 

	    CompanyStatus(int code) {
	        this.code = code; 
	    }

	    public int getCode() {
	        return code;
	    }
	    public static String getNameByCode(int code) throws CustomException {
	        for (CompanyStatus status : CompanyStatus.values()) {
	            if (status.getCode() == code) {
	                return status.name();
	            }
	        }
	        throw new CustomException(400,"Invalid status: " + code); // Exception for invalid code
	    }
	}
	
	
	public static enum UserStatus {
	 	Approved(1),
	    Blocked(2);

	    private final int code; 

	    UserStatus(int code) {
	        this.code = code; 
	    }

	    public int getCode() {
	        return code;
	    }
	    public static String getNameByCode(int code) throws CustomException {
	        for (UserStatus status : UserStatus.values()) {
	            if (status.getCode() == code) {
	                return status.name();
	            }
	        }
	        throw new CustomException(400,"Invalid status: " + code); // Exception for invalid code
	    }
	}
	
	public static enum DriverStatus {
	    Pending(1, "pending"),
	    Approved(2, "approved"),
	    Blocked(4, "blocked"),
		Reported(5,"reported");

	    private final int code; 
	    private final String name;

	    DriverStatus(int code, String name) {
	        this.code = code;
	        this.name = name;
	    }

	    public int getCode() {
	        return code;
	    }

	    public String getName() {
	        return name;
	    }

	    public static String getNameByCode(int code) throws CustomException {
	        for (DriverStatus status : DriverStatus.values()) {
	            if (status.getCode() == code) {
	                return status.name();
	            }
	        }
	        throw new CustomException(400,"Invalid status: " + code); // Exception for invalid code
	    }
	}

	
	
	public static enum RideStatus 
	{
	    Waiting(1),
	  	Cancelled(2),
	    Accepted(3),
	    Completed(4),
	    Rejected(5),
		Started(6);

	   private final int code; 

	   RideStatus(int code) 
	   {
	        this.code = code; 
	   }

	   public int getCode() {
		   return code; 
	    }
	   
	   public static String getNameByValue(int value) {
	       for (RideStatus status : RideStatus.values()) {
	           if (status.getCode() == value) {
	               return status.name();
	           }
	       }
	       return "Unknown";
	   }
	   
	   public static int getValueByName(String name) {
		   RideStatus action = RideStatus.valueOf(name);
			return action.getCode();
		}
	}
	
	public enum CabStatus { 
	    Available(1, "available"),
	    UnAvailable(2, "unavailable"),
	    Riding(3, "riding");

	    private final int code; 
	    private final String description; 

	    CabStatus(int code, String description) { 
	        this.code = code; 
	        this.description = description;
	    }

	    public int getCode() { 
	        return code; 
	    }

	    public String getDescription() {
	        return description;
	    }
	    
	    public static String getDescriptionByCode(int code) {
	        for (CabStatus status : CabStatus.values()) {
	            if (status.getCode() == code) {
	                return status.getDescription();
	            }
	        }
	        return "Unknown status";  
	    }
	    
	    public static String getNameByValue(int value) {
		       for (CabStatus status : CabStatus.values()) {
		           if (status.getCode() == value) {
		               return status.name();
		           }
		       }
		       return "Unknown";
		   }
	}
	

	public enum Operators {
	    AND("and"),
	    OR("or"),
	    GREATERTHANOREQUALTO(">="),
	    NOTEQUALTO("!="),
	    EQUALTO("=");

	    private final String symbol;

	    Operators(String symbol) {
	        this.symbol = symbol;
	    }

	    public  String getSymbol() {
	        return symbol;
	    }
	}


}

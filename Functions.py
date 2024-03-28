
import os
from datetime import date, datetime

from zcrmsdk.src.com.zoho.crm.api import HeaderMap, ParameterMap
from zcrmsdk.src.com.zoho.crm.api.attachments import Attachment
from zcrmsdk.src.com.zoho.crm.api.layouts import Layout
from zcrmsdk.src.com.zoho.crm.api.record import *
from zcrmsdk.src.com.zoho.crm.api.record import Record as ZCRMRecord
from zcrmsdk.src.com.zoho.crm.api.tags import Tag
from zcrmsdk.src.com.zoho.crm.api.users import User
from zcrmsdk.src.com.zoho.crm.api.util import Choice, StreamWrapper

def get_fields_name(module_api_name):
    if (module_api_name == "Linkedin_Module"):
        return {
            "List_Data":["Name","Name1","Current_Role","Current_Company","Location"],
            "Sort_by":"Name"
        }
    if (module_api_name == "Linkedin_Module_Demo"):
        return {
            "List_Data":["Name","Name1","Current_Role","Current_Company","Location"],
            "Sort_by":"Name"
        }
    

def get_records(module_api_name,page_no):

    record_operations = RecordOperations()
    param_instance = ParameterMap()
    param_instance.add(GetRecordsParam.page, page_no)
    param_instance.add(GetRecordsParam.per_page, 100)

    field_names = get_fields_name(module_api_name)
    for field in field_names["List_Data"]:
        param_instance.add(GetRecordsParam.fields, field)

    param_instance.add(GetRecordsParam.sort_by, field_names["Sort_by"])
    param_instance.add(GetRecordsParam.sort_order, 'desc')
    response = record_operations.get_records(module_api_name, param_instance)

    if response is not None:

        # Get the status code from response
        print('Status Code: ' + str(response.get_status_code()))

        if response.get_status_code() in [204, 304]:
            print('No Content' if response.get_status_code() == 204 else 'Not Modified')
            return

        # Get object from response
        response_object = response.get_object()

        if response_object is not None:

            # Check if expected ResponseWrapper instance is received.
            if isinstance(response_object, ResponseWrapper):

                # Get the list of obtained Record instances
                record_list = response_object.get_data()
                info = response_object.get_info()
                info_data = {
                    "per_page": info.get_per_page() if info.get_per_page() is not None else "",
                    "page": info.get_page() if info.get_page() is not None else "",
                    "count": info.get_count() if info.get_count() is not None else "",
                    "more_records": info.get_more_records() if info.get_more_records() is not None else ""
                }

                return {
                    "record_lsit":record_list,
                    "info":info_data
                }

def update_records(module_api_name,profile_list):

        """
        This method is used to update the records of a module with ID and print the response.
        :param module_api_name: The API Name of the module to update records.
        """

        """
        example
        module_api_name = 'Leads'
        """
        record_operations = RecordOperations()
        request = BodyWrapper()

        records_list = []
        for profile in profile_list:
            try:
                record1 = ZCRMRecord()
                record1.set_id(profile["id"])
                record1.add_key_value(api_name="Current_Company", value=profile['experiences'][0]["companyName"])
                record1.add_key_value(api_name="Location", value=profile['experiences'][0]["location"])
                record1.add_key_value(api_name="Current_Role", value=profile['experiences'][0]["role"])
                record1.add_key_value(api_name="Name1", value=profile['name'])    
                records_list.append(record1)
            except KeyError:
                print("No record for the fetched profile : " + profile["url"])
            except IndexError:
                print("Experiences list is empty for the fetched profile: " + profile["url"])
        print(records_list)
        request.set_data(records_list)

        trigger = []
        trigger.append("approval")
        trigger.append("workflow")
        trigger.append("blueprint")
        request.set_trigger(trigger)

        header_instance = HeaderMap()
        response = record_operations.update_records(module_api_name, request, header_instance)

        if response is not None:
            print('Status Code: ' + str(response.get_status_code()))
            response_object = response.get_object()

            if response_object is not None:
                if isinstance(response_object, ActionWrapper):
                    action_response_list = response_object.get_data()
                    for action_response in action_response_list:
                        if isinstance(action_response, SuccessResponse):
                            print("Status: " + action_response.get_status().get_value())
                            print("Code: " + action_response.get_code().get_value())

                            print("Details")
                            details = action_response.get_details()

                            for key, value in details.items():
                                print(key + ' : ' + str(value))
                            print("Message: " + action_response.get_message().get_value())

                        elif isinstance(action_response, APIException):
                            print("Status: " + action_response.get_status().get_value())
                            print("Code: " + action_response.get_code().get_value())
                            print("Details")
                            details = action_response.get_details()

                            for key, value in details.items():
                                print(key + ' : ' + str(value))

                            print("Message: " + action_response.get_message().get_value())

                elif isinstance(response_object, APIException):
                    print("Status: " + response_object.get_status().get_value())
                    print("Code: " + response_object.get_code().get_value())
                    print("Details")
                    details = response_object.get_details()

                    for key, value in details.items():
                        print(key + ' : ' + str(value))
                    print("Message: " + response_object.get_message().get_value())
 
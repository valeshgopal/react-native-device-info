package com.deviceinfosdk

import android.content.Context
import android.os.Build
import android.provider.Settings
import android.util.DisplayMetrics
import android.view.WindowManager
import com.facebook.react.bridge.*
import java.net.InetAddress
import java.util.Collections
import java.net.NetworkInterface
import android.text.format.Formatter
import android.net.wifi.WifiManager

class DeviceInfoSdk(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DeviceInfoSdk"
    }

    @ReactMethod
    fun getDeviceInfo(promise: Promise) {
        try {
            val context: Context = reactApplicationContext

            // IP Address
            val ipAddress: String = getDeviceIpAddress() ?: "0.0.0.0"

            // Android ID
            val androidId: String = Settings.Secure.getString(context.contentResolver, Settings.Secure.ANDROID_ID)

            // Device Information
            val brand: String = Build.BRAND
            val model: String = Build.MODEL

            // Screen Size
            val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
            val metrics = DisplayMetrics()
            windowManager.defaultDisplay.getMetrics(metrics)
            val screenSize = "${metrics.widthPixels}x${metrics.heightPixels}"

            // OS Information
            val osVersion: String = Build.VERSION.RELEASE

            // Collecting all data
            val deviceInfo = WritableNativeMap().apply {
                putString("ipAddress", ipAddress)
                putString("androidId", androidId)
                putString("brand", brand)
                putString("model", model)
                putString("screenSize", screenSize)
                putString("osVersion", osVersion)
            }

            promise.resolve(deviceInfo)

        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    private fun getDeviceIpAddress(): String? {
        val wifiIpAddress = getWifiIpAddress()
        if (wifiIpAddress != null) {
            return wifiIpAddress
        }

        val mobileIpAddress = getIPAddress()
        if (mobileIpAddress != null) {
            return mobileIpAddress
        }

        return null
    }


    private fun getIPAddress(): String? {
       try {
            val interfaces = Collections.list(NetworkInterface.getNetworkInterfaces())
            for (intf in interfaces) {
                val addrs = Collections.list(intf.inetAddresses)
                for (addr in addrs) {
                    if (!addr.isLoopbackAddress) {
                        val sAddr = addr.hostAddress
                        val isIPv4 = sAddr.indexOf(':') < 0

                        if (isIPv4) {
                            return sAddr
                        }
                    }

               }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return null
    }

    private fun getWifiIpAddress(): String? {
        val context: Context = reactApplicationContext
        var wifiManager = context.getSystemService(Context.WIFI_SERVICE) as WifiManager
         if (wifiManager != null) {
            val ipAddress = wifiManager.connectionInfo?.ipAddress
            if (ipAddress != null && ipAddress != 0) {
                return Formatter.formatIpAddress(ipAddress)
            }
        }
        return null
    }
}

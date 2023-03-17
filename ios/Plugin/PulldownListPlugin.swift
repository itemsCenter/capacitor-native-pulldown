import Foundation
import Capacitor
import UIKit
import SwiftUI

@objc(PulldownListPlugin)
public class PulldownListPlugin: CAPPlugin {

    var content: [PulldownListItem] = []

    @objc func show(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let options = call.getObject("options") ?? [:]
            let x = options["x"] as? CGFloat ?? 0
            let y = options["y"] as? CGFloat ?? 0
            
            guard let rootViewController = UIApplication.shared.windows.first?.rootViewController else {
                call.reject("Unable to access the root view controller")
                return
            }
            
            let hostingController = UIHostingController(rootView: PulldownListView(content: self.content, completionHandler: { selectedItem in
                call.resolve()
                let itemInfo: [String: Any] = ["id": selectedItem.id, "title": selectedItem.title, "icon": selectedItem.icon ?? ""]
                self.notifyListeners("itemSelected", data: itemInfo)
            }))
            
            hostingController.view.frame.origin = CGPoint(x: x, y: y)
            rootViewController.present(hostingController, animated: true, completion: nil)
        }
    }

    @objc func setContent(_ call: CAPPluginCall) {
        if let items = call.getArray("items", JSObject.self) {
            content = items.map({ item in
                PulldownListItem(id: item["id"] as? String ?? "", title: item["title"] as? String ?? "", icon: item["icon"] as? String)
            })
        }
        call.resolve()
    }

    @objc func setPosition(_ call: CAPPluginCall) {
        // not using after all
        call.unimplemented()
    }

}

struct PulldownListView: View {
    @Environment(\.presentationMode) var presentationMode
    
    var content: [PulldownListItem]
    var completionHandler: (PulldownListItem) -> Void

    var body: some View {
        Menu {
            ForEach(content, id: \.id) { item in
                Button(action: {
                    completionHandler(item)
                    presentationMode.wrappedValue.dismiss()
                }) {
                    HStack {
                        Text(item.title)
                        Spacer()
                        if let iconName = item.icon {
                            Image(systemName: iconName).foregroundColor(.black)
                                .imageScale(.medium)
                        }
                    }.padding()
                }
            }
        } label: {
            Label("", systemImage: "")
        }
        .menuStyle(MenuPickerStyle())
        .background(Color(.systemBackground))
    }
}


struct PulldownListItem: Identifiable {
    var id: String
    var title: String
    var icon: String?
}